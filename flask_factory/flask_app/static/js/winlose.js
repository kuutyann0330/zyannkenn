function npc_hand(){
    let random_hand = Math.floor(Math.random()*3);
    if (random_hand == 0) {
        console.log("これはパーです");
        document.getElementById("cpu_hand_img").src = "/static/images/paper.png";
        return "paper"
      } else if (random_hand == 1) {
        console.log("これはチョキです");
        document.getElementById("cpu_hand_img").src = "/static/images/scissors.png";
        return "scissors"
      } else {
        console.log("これはグーです");
        document.getElementById("cpu_hand_img").src = "/static/images/rock.png";
        return "rock"
      } 
}
function winlose(hand_gestuer,npc_gestuer){
    
}

// 正解表示用
let con = document.getElementById("result_display");
con.textContent = "正解!!"