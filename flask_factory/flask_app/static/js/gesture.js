// x：横方向（0.0が左端、1.0が右端）
// y：縦方向（高さ）（0.0が一番上、1.0が一番下）
// z：奥行（手前 (マイナス)	奥 (プラス)）手首を 0 とした相対的な距離

/**
 * 手の形が「パー」かどうかを判定する関数
 * @param {Array} landmarks - 21個の座標データ
 * @returns {boolean}
 */
export function isPaper(landmarks) {
  // 4本の指（人差し指〜小指）の先が、それぞれの付け根より上にあるか
  const fingerTips = [8, 12, 16, 20];
  const fingerBases = [5, 9, 13, 17];

  // すべての指先(Tip)が付け根(Base)より上(yが小さい)ならtrue
  return fingerTips.every((tipIndex, i) => {
    return landmarks[tipIndex].y < landmarks[fingerBases[i]].y;
  });
}