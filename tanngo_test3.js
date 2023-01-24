//データ
var word = ['abandon', 'admire', 'attach', 'beast', 'bully', 'cancer', 'chore', 'compliment', 'comprehend', 'compromise', 'confidence', 'crowd', 'dedecate', 'desperate', 'discourage', 'distinguish', 'elaborate', 'endure', 'enhance', 'epidemic', 'era', 'establish', 'faith', 'fame', 'famine', 'gravity', 'harvest', 'heal', 'heritage', 'hesitate', 'impose', 'indispensable', 'ingredient', 'invent', 'invite', 'neglect', 'nutrition', 'outcome', 'parliament', 'pity', 'primitive', 'proverb', 'radical', 'refuse', 'reinforce', 'settle', 'shame', 'substitute', 'temptation', 'wheat', 'praise', 'burst', 'exclaim', 'compel', 'portray', 'drag', 'recall', 'be short of', 'be nothing short of', 'decision', 'meditation', 'crucial', 'reputation', 'shrink', 'ladder', 'resolve', 'triumph', 'grave', 'diet', 'fundamental', 'crop', 'prior', 'overall', 'fix-up', 'virtually', 'figure out', 'a great deal of', 'negotiate', 'handful', 'absorb', 'elaborate on', 'barely', 'outcome', 'civil', 'cast out', 'cast', 'shed', 'hang', 'brief', 'seldom', 'scarce'] ;
var meaning= ['を諦める、を見捨てる', 'に敬服する、を称賛する、に感心する', 'を付ける、を添付する、に愛着を感じさせる', '動物、獣', 'いじめっ子、いじめる', 'がん', '雑用、退屈な仕事、日常の雑事', '賛辞、お世辞', 'をしっかりと理解する', '妥協、妥協する', '信頼、自信', '群衆、に群がる、群がる', 'を捧げる', '絶望的な、欲しくてたまらない、必死の', 'を落胆させる、を妨害する', 'を見分ける、を区別する、区別す る', '手の込んだ、詳しく述べる', 'に耐える', 'を高める、をよりよくする', '伝染性の、流行の、伝染病、流行', '時代', 'を設立する、を確立する、を立証する', '信頼、信仰', '名声', '飢饉、物質の不足', '重力', '収穫物、収穫時期、収穫する', 'いやす、いえる', '相続財産、文化遺産', 'ためらう', '課す、つけこむ', '不可欠な', '材料', '投資する', '招く、依頼する', '無視、怠慢、無視する、怠ける', '栄養物', '結果', '議会', '哀れみ、気の毒に思う', '原始の', 'ことわざ', '根本的な、急進的な', '拒む、ごみ', '強化する', '落ち着かせる、解決する、定住する', '恥ずかしさ、羞恥心', '代用する、代用品', '誘惑物', '小麦', ' 賞賛する、賞賛', '突発する、破裂する', '叫ぶ', 'することを強いる', '描く、描写する', 'のろのろと進む', '思い出す', 'が不足している', 'に他ならない', '決意', '瞑想、熟考', '必要不可欠の', '名声', '尻込 みする', '梯子', '決意する', '勝利', '重大な、墓穴', '食事', '基本的な', '作物', '前の', '全体の', '理解する', 'ほとんど、実質的には', '理解する', '多量の', '交渉する', '一つかみ程度の', '理解する、吸 収する', '詳しく述べる', 'かろうじて～する', '結果', '民間人の', '追い出す', '投げかける、役を割り当てる', '光を当てる、涙を流す、小屋', 'つるす', '短期間の、簡潔な', 'めったに～しない', '不足して'] ;

var Word ;
var Meaning ;

var question;
var correctAnswer;

var remindQuestion = []; //間違えた問題を入れていくリスト
var remindCorrectAnswer = []; //間違えた問題の答えを入れていく

var WL;
var n = []; //出題する問題番号
var max ;



var numRangeMax = document.getElementById("num_range_max");  
var numRangeMin = document.getElementById("num_range_min");
numRangeMax.max = `${word.length}`;
numRangeMin.max = `${word.length}`;



//問題を作る関数
var makeQuestions = function(){
    //正誤判定欄の中身を初期化
    document.getElementById("judge").innerHTML = "";

    
    //すべての問題からか、間違えた問題からかで使うデータを変える
    var Qtype = document.forms.Qtype.selectQtype.value;
    switch (Qtype) {
        
        case "all":
            Word = word;
            Meaning = meaning;
            break;

        case "remind":
            Word = remindQuestion
            Meaning = remindCorrectAnswer
            console.log(remindCorrectAnswer,Word) 
            break;
            
        default:
            break
    }

    WL = Word.length;


    //入力された問題の範囲を取得
    var rangeMax = parseInt(numRangeMax.value) ;
    var rangeMin = parseInt(numRangeMin.value) -1;

    //入力された問題数を取得
    max = document.getElementById("max_num").value;
    console.log(`max=${max}`);

    if (max > WL){
        max = WL
    }

    
    //ランダムか順番かで n の配列を作る
    n.length = 0    //配列の中身を初期化
    var Qalign = document.forms.Qalign.selectQalign.value;
    switch (Qalign){
        case "random" :
            //ランダムな数字の配列を作る
            for (let i = 0; i < max; i++) {
                n.push(Math.floor(Math.random()*WL))
            }
            break
        
        case "order":
            //順番の数字の配列を作る
            for (let i = rangeMin; i < rangeMax; i+=1) {
                n.push(i)
            }
            break
        
        default:
            break
    }

    console.log(Qtype,Qalign)

    //問題文要素をnum個分作ってQuestionにつなぎ合わせていく
    var Questions = ""
    for (let i = 0; i < max; i += 1){
        question = Word[n[i]]
        Questions += `<p class="questions" id = question${i+1}>問題${i+1} : ${n[i]+1} . ${question}</p>`
    }
    
    //HTMLのid=questionの中身に入れる
    document.getElementById("question").innerHTML = Questions;   

    //解答欄を作る
    var InputAnswers = ""
    for (let i = 0; i < max; i += 1){
        InputAnswers += `<input class = "InputAnsers" id = "inputAnswer${i+1}" type="text" placeholder="解答を入力">`
    }
    document.getElementById("inputAnswer").innerHTML = InputAnswers;
}


//入力された範囲で順番に問題を作る関数
var makeQuestionsRange = function(Word,Meaning){
    WL = Word.length;
    Word = Word;
    Meaning = Meaning;

    //入力された問題番号を取得して問題数を計算
    var rangeMax = parseInt(document.getElementById("num_range_max").value) ;
    var rangeMin = parseInt(document.getElementById("num_range_min").value) -1;
    max = rangeMax - rangeMin ;
    console.log(`max=${max}`);

    //順番の数字の配列を作る
    n.length = 0    //配列の中身を初期化
    for (let i = rangeMin; i < rangeMax; i+=1) {
        n.push(i)
    }

    //前の判定を消す
    document.getElementById("judge").innerHTML = "";

    //問題文要素をnum個分作ってQuestionにつなぎ合わせていく
    var Questions = "";
    for (let i = 0 ; i < max ; i += 1){
        question = Word[n[i]];
        Questions += `<p class="questions" id = question${i+1}>問題${i+1} : ${n[i]+1} . ${question}</p>`;
    }
    
    //HTMLのid=questionの中身に入れる
    document.getElementById("question").innerHTML = Questions;   

    //解答欄を作る
    var InputAnswers = ""
    for (let i = 0; i < max; i += 1){
        InputAnswers += `<input class = "InputAnsers" id = "inputAnswer${i+1}" type="text" placeholder="解答を入力">`;
    }
    document.getElementById("inputAnswer").innerHTML = InputAnswers;
}

//正誤判定と答えを出す関数
var checkButton_pushed = function() {
    //答え
    var Judges = ""
    var maruNum = 0 ;
    var sannkakuNum = 0 ;
    

    for (let i = 0; i < max; i += 1){
        correctAnswer = Meaning[n[i]];
        var inputAnswer = document.getElementById(`inputAnswer${i+1}`);

        //正誤判定
        if (inputAnswer.value == correctAnswer){
            judge = "◎";
            maruNum += 1

            //間違えた問題リストから今正解した問題を一つ消す
            remindQuestion.splice(n[i],1)
            remindCorrectAnswer.splice(n[i],1)
            console.log(remindQuestion,remindCorrectAnswer);
        
        } else if (correctAnswer.includes(inputAnswer.value) == true && inputAnswer.value != "") {
            judge = "○  " + correctAnswer;
            sannkakuNum += 1 ;

            //間違えた問題リストから今正解した問題を一つ消す
            remindQuestion.splice(n[i],1)
            remindCorrectAnswer.splice(n[i],1)
            console.log(remindQuestion,remindCorrectAnswer);
        
        } else {
            judge = "✕  " + correctAnswer;

            //間違えた問題リストに入れる
            remindQuestion.push(Word[n[i]]);
            remindCorrectAnswer.push(correctAnswer)
            console.log(remindQuestion,remindCorrectAnswer);
        }
        
        Judges += `<p class="judges" id="judge${i+1}">${judge}</p>`

    } 
    document.getElementById("judge").innerHTML = Judges;

    //点数
    document.getElementById("point").innerHTML = `${maruNum}/${max} 点`;

}

