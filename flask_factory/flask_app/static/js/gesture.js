// x：横方向（0.0が左端、1.0が右端）
// y：縦方向（高さ）（0.0が一番上、1.0が一番下）
// z：奥行（手前 (マイナス)	奥 (プラス)）手首を 0 とした相対的な距離

// 2点間の距離を計算するヘルパー関数
function getDistance(p1, p2) {
    return Math.sqrt(
        Math.pow(p1.x - p2.x, 2) + 
        Math.pow(p1.y - p2.y, 2) + 
        Math.pow(p1.z - p2.z, 2) // z（奥行き）も入れると最強です
    );
}

export function judgeHand(landmarks) {
    // 各指の「指先」と「第1関節」の距離を測る
    // 指が伸びていれば距離が長く、曲がっていれば短くなる
    const indexDistance = getDistance(landmarks[8], landmarks[5]);
    const middleDistance = getDistance(landmarks[12], landmarks[9]);
    const ringDistance = getDistance(landmarks[16], landmarks[13]);
    const pinkyDistance = getDistance(landmarks[20], landmarks[17]);

    // 距離のしきい値（カメラとの距離にもよるが、0.1〜0.2程度が目安）
    const threshold = 0.1; 

    const isIndexActive = indexDistance > threshold;
    const isMiddleActive = middleDistance > threshold;
    const isRingActive = ringDistance > threshold;
    const isPinkyActive = pinkyDistance > threshold;

    // あとは同じ判定ロジックが使えます
    if (isIndexActive && isMiddleActive && isRingActive && isPinkyActive) return "paper";
    if (isIndexActive && isMiddleActive && !isRingActive && !isPinkyActive) return "scissors";
    if (!isIndexActive && !isMiddleActive && !isRingActive && !isPinkyActive) return "rock";

    return "unknown";
}