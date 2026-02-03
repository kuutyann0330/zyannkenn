export function getnpc_hand(){
    let random_hand = Math.floor(Math.random()*3);
    if (random_hand === 0) {
        console.log("これはパーです");
        return "paper"
      } else if (random_hand === 1) {
        console.log("これはチョキです");
        return "scissors"
      } else {
        console.log("これはグーです");
        return "rock"
      } 
}
// export:外部ファイルから呼び出すときは必ず付けよう
export function winlose(hand_gestuer,npc_gestuer){
    
}

// 正解表示用
let con = document.getElementById("result_display");
con.textContent = "正解!!"