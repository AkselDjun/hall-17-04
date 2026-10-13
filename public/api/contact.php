<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

const FORMATS = [
    'Свадьба под ключ',
    'Юбилей под ключ',
    '18-летие',
    'Крещение',
    'Мероприятие не под ключ',
    'День рождения',
    'Корпоратив',
    'Фотостудия',
    'Другое',
];

function respond(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false]);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== preg_replace('/:\d+$/', '', $host)) {
    respond(403, ['ok' => false]);
}

$configPath = dirname(__DIR__, 2) . '/telegram-config.php';
$config = is_file($configPath) ? require $configPath : null;
if (!is_array($config) || empty($config['token']) || empty($config['chat_id'])) {
    respond(500, ['ok' => false]);
}

$input = json_decode((string) file_get_contents('php://input', false, null, 0, 10000), true);
if (!is_array($input)) {
    respond(400, ['ok' => false]);
}

if (trim((string) ($input['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

$name = trim((string) ($input['name'] ?? ''));
$date = trim((string) ($input['date'] ?? ''));
$guests = trim((string) ($input['guests'] ?? ''));
$format = trim((string) ($input['format'] ?? ''));
$digits = preg_replace('/\D/', '', (string) ($input['phone'] ?? ''));

if (preg_match('/^375\d{9}$/', $digits)) {
    $phone = '+' . $digits;
} elseif (preg_match('/^80\d{9}$/', $digits)) {
    $phone = '+375' . substr($digits, 2);
} elseif (preg_match('/^\d{9}$/', $digits)) {
    $phone = '+375' . $digits;
} else {
    $phone = null;
}

$valid = $name !== ''
    && mb_strlen($name) <= 100
    && $phone !== null
    && ($date === '' || preg_match('/^\d{2}\.\d{2}(\.\d{4})?$/', $date))
    && ($guests === '' || preg_match('/^\d{1,4}$/', $guests))
    && ($format === '' || in_array($format, FORMATS, true));

if (!$valid) {
    respond(422, ['ok' => false]);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$limitFile = sys_get_temp_dir() . '/hall1704-booking-' . md5($ip);
$now = time();
$window = 600;
$maxRequests = 5;
$recent = [];
if (is_file($limitFile)) {
    $stored = json_decode((string) file_get_contents($limitFile), true);
    if (is_array($stored)) {
        $recent = array_values(array_filter($stored, fn ($t) => is_int($t) && $t > $now - $window));
    }
}
if (count($recent) >= $maxRequests) {
    respond(429, ['ok' => false]);
}
$recent[] = $now;
file_put_contents($limitFile, json_encode($recent), LOCK_EX);

$text = implode("\n", [
    'Новая заявка HALL 17.04',
    "Имя: {$name}",
    "Телефон: {$phone}",
    'Дата: ' . ($date !== '' ? $date : '—'),
    'Гостей: ' . ($guests !== '' ? $guests : '—'),
    'Формат: ' . ($format !== '' ? $format : '—'),
]);

$ch = curl_init('https://api.telegram.org/bot' . $config['token'] . '/sendMessage');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode(['chat_id' => $config['chat_id'], 'text' => $text], JSON_UNESCAPED_UNICODE),
]);
$result = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

if ($result === false || $status !== 200) {
    respond(502, ['ok' => false]);
}

respond(200, ['ok' => true]);
