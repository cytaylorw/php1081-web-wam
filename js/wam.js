
    let lang=getLang();
    let file = (lang.includes("zh"))?"./js/label.js":"./js/label_en.js";
    loadScript(file, game);

    
    
    function game(){
        const totalTime = 10;
        const num = 2;
        const intervalBySec = 1.5;

        // 放入標籤
        document.title=label.title;
        document.getElementById("scoreLabel").insertAdjacentText("afterbegin",label.score);
        let start =  document.getElementById("start");
        start.value=label.start_button;
        let remainLbel = document.getElementById("remainLabel");
        remainLbel.insertAdjacentText("afterbegin",label.remain_time);
        remainLbel.insertAdjacentText("beforeend",label.remain_time_unit);
        let timeLeft = document.getElementById("timeLeft");
        timeLeft.innerText = totalTime;
        
        let score = 0;
        let scoreText = document.getElementById("score");
        let tds = document.getElementsByTagName("td");
        let timer = 0;
        let gameTimer = 0;
        
        let time = totalTime;
        timeLeft.innerText = totalTime;
        start.onclick = function(){
            timeLeft.innerText = time;
            scoreText.innerText = score;
            timer = setInterval(putMole,1000*intervalBySec);
            putMole();
            start.disabled=true;
            gameTimer = setInterval(countDown,1000);
            document.body.classList.remove("result");
            document.body.classList.add("noResult");
        }

        for(let i=0;i<tds.length;i++){
                tds[i].onclick = function(){
                    if(this.classList.contains("red")){
                        this.classList.remove("red");
                        this.classList.add("blue");
                        score++;
                        scoreText.innerText=score; 
                    }
                }
        }

        function countDown(){
            time--;
            timeLeft.innerText = time;
            if(time == 0){
                clearInterval(timer);
                clearInterval(gameTimer);
                document.body.classList.remove("noResult");
                document.body.classList.add("result");
                setTimeout(function(){
                    alert(label.result.format(Math.ceil((totalTime/intervalBySec))*num,score));
                    time = totalTime;
                    score = 0;
                    start.disabled=false;
                },100)
                for(let i=0;i<tds.length;i++){
                    tds[i].classList.remove("red");
                    tds[i].classList.remove("blue");
                }
                
            }
        }
    
        function putMole(){
            for(let i=0;i<tds.length;i++){
                tds[i].classList.remove("red");
                tds[i].classList.remove("blue");
            }
            let rands=[];
            do{ 
                let rand = Math.floor(Math.random()*9);
                if(!rands.includes(rand))rands[rands.length]=rand;
            }while(rands.length < num)
    
            for(let i=0;i<rands.length;i++){
                tds[rands[i]].classList.add("red");
            }
        }
    }
    

    function getLang(){
        return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
    }

    function loadScript(url, callback)
    {
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        script.onreadystatechange = callback;
        script.onload = callback;

        head.appendChild(script);
    }

    String.prototype.format = function() {
        var formatted = this;
        for( var arg in arguments ) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };