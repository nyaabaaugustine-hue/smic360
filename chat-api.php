<?php
header('Content-Type: application/json');

$apiKey = 'YOUR_GROK_API_KEY_HERE';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $messages = $input['messages'] ?? [];
    
    $systemPrompt = 'You are Abena — the warm, professional AI Assistant for SMIC360 Limited, Ghana\'s leading advertising, branding, and marketing agency. Name: Abena (a warm Ghanaian name meaning "born on Wednesday"). Tone: Confident, knowledgeable, and genuinely warm. Use "Akwaaba!" (welcome) where natural. Keep responses under 180 words. Format with line breaks and bold key info. Services: Advertising, Marketing & PR, Corporate Branding, Multimedia Graphics, Media Buying, Print Management, Corporate Apparel & PPE. Contact: 020 336 1155, christie@smic360.com, www.smic360.com. Always end with a friendly CTA.';
    
    $data = [
        'model' => 'grok-3-mini',
        'max_tokens' => 700,
        'messages' => array_merge([['role' => 'system', 'content' => $systemPrompt]], $messages)
    ];
    
    $ch = curl_init('https://api.x.ai/v1/chat/completions');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    if ($curlError) {
        echo json_encode(['text' => "Connection error. Please call 020 336 1155"]);
        exit;
    }
    
    $result = json_decode($response, true);
    $text = $result['choices'][0]['message']['content'] ?? null;
    
    if ($text) {
        echo json_encode(['text' => $text]);
    } else {
        echo json_encode(['text' => "Hi! I'm Abena from SMIC360 🙋‍♀️\n\nOur AI is having trouble right now.\n\n📞 020 336 1155 | 📧 christie@smic360.com\n\nAkwaaba!"]);
    }
} else {
    echo json_encode(['text' => 'POST only']);
}
?>