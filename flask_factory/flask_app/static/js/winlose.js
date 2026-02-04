export function getnpc_hand() {
  let random_hand = Math.floor(Math.random() * 3);
  if (random_hand === 0) {
    console.log("NPCはパーです");
    return "paper"
  } else if (random_hand === 1) {
    console.log("NPCはチョキです");
    return "scissors"
  } else {
    console.log("NPCはグーです");
    return "rock"
  }
}

export function get_hand(hand) {
  // ここに勝敗を決めるロジックを入れて　tureがリターンされたらforを減らすようにすれば
  if (hand == "rock") {
    console.log("playerはグーです");
    return 0

  } else if (hand == "paper") {
    console.log("playerパーです");
    return 1

  } else if (hand == "scissors") {
    console.log("playerチョキです");
    return 2

  } else {
    console.log("じゃんけんだろ");
    return 3
  }
}
// export:外部ファイルから呼び出すときは必ず付けよう
export function winlose(player_hand, npc_hand) {
  if (player_hand <= 2) {
    // 結果を求めるための二次元配列
    // 0；あいこ 1:勝利 2:敗北
    const win_or_loss_List = [
      [0, 1, 2],
      [2, 0, 1],
      [1, 2, 0]
    ];
    
    let win_or_loss = win_or_loss_List[player_hand][npc_hand];
    
    return (win_or_loss);

  }else{
    return "3"
  }
};

// 正解表示用
let con = document.getElementById("result_display");
con.textContent = "正解!!"