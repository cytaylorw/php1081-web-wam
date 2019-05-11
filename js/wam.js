
    let lang=getLang();
    let file = (lang.includes("zh"))?"./js/label.js":"./js/label_en.js";

    loadScript(file, game);

    
    
    function game(){
        const modes = [
            ["easy",label.mode_easy,10,3,5],
            ["normal",label.mode_normal,10,2,2,"selected"],
            ["hard",label.mode_hard,10,1,0.3],
            ["custom",label.mode_custom]
        ]

        // 放入標籤
        document.title=label.title;
        document.getElementById("scoreLabel").insertAdjacentText("afterbegin",label.score);
        let start =  document.getElementById("start");
        start.value=label.start_button;
        document.getElementById("modeLabel").insertAdjacentText("afterbegin",label.mode);
        document.getElementById("totalLabel").insertAdjacentText("afterbegin",label.total);
        document.getElementById("numLabel").insertAdjacentText("afterbegin",label.num);
        document.getElementById("intervalLabel").insertAdjacentText("afterbegin",label.interval);
        let remainLbel = document.getElementById("remainLabel");
        remainLbel.insertAdjacentText("afterbegin",label.remain_time);
        let timeLeft = document.getElementById("timeLeft");
        

        let modeSelect = document.getElementById("mode");
        let inputs =  [
            document.getElementById("total"),
            document.getElementById("num"),
            document.getElementById("interval")
        ];
        for(let i=0;i<modes.length;i++){
            addOption(modeSelect,modes[i]);
        }

        modeSelect.addEventListener("change",function(){
            if(modeSelect.value == modes[0][0]){
                setInputs(inputs,modes[0]);
                disableInputs(true);
            }else if(modeSelect.value == modes[1][0]){
                setInputs(inputs,modes[1]);
                disableInputs(true);
            }else if(modeSelect.value == modes[2][0]){
                setInputs(inputs,modes[2]);
                disableInputs(true);
            }else if(modeSelect.value == modes[3][0]){
                setInputs(inputs,modes[3]);
                disableInputs(false);
            }else{
                modeSelect.value = modes[2][0];
                setInputs(inputs,modes[2]);
                disableInputs(true);
            }
        })

        timeLeft.innerText = inputs[0].value;
        
        let score = 0;
        let scoreText = document.getElementById("score");
        let tds = document.getElementsByTagName("td");
        let timer = 0;
        let gameTimer = 0;
        let time;

        start.onclick = function(){
            start.disabled=true;
            modeSelect.disabled=true;
            disableInputs(true);
            time = inputs[0].value;
            timeLeft.innerText = time;
            scoreText.innerText = score;
            console.log("interval"+inputs[2].value);
            timer = setInterval(putMole,1000*inputs[2].value);
            putMole();
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
        
        for(let i=0;i<inputs.length;i++){
            inputs[i].oninput = function(){
                if(inputs[0].value<5 || inputs[1].value<1 || inputs[1].value>5 || inputs[2].value<0.1){
                    start.disabled=true;
                }else{
                    start.disabled=false;
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
                    alert(label.result.format(Math.ceil((inputs[0].value/inputs[2].value))*inputs[1].value,score));
                    score = 0;
                    start.disabled=false;
                    modeSelect.disabled=false;
                    if(modeSelect.value == modes[3][0]){
                        disableInputs(false);
                    }
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
            }while(rands.length < inputs[1].value)
    
            for(let i=0;i<rands.length;i++){
                tds[rands[i]].classList.add("red");
                tds[rands[i]].style.animationDuration=inputs[2].value+"s";
            }
        }

        function setInputs(element,value){
            for(let i=0;i<element.length;i++){
                if(value[i+2] != undefined)element[i].value=value[i+2];
            }
        }

        function addOption(select,mode){
            let option = document.createElement("option");
            option.text = mode[1];
            option.value = mode[0];
            if(mode.includes("selected")){
                option.selected = true;
                setInputs(inputs,mode);
                if(mode != modes[2][0])disableInputs(true);
            } 
            select.add(option, select[select.length]);
        }

        function disableInputs(bool){
            for(let i=0;i<inputs.length;i++){
                inputs[i].disabled=bool;
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