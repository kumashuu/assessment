// 診断結果の内容をツイートに転用するプログラムが機能しない
'user strict';
const userNameImput = document.getElementById('user-name');
const assessmentButton =document.getElementById('assessment');
const resultDiv = document.getElementById('result-area');
const tweetDiv = document.getElementById('tweet-area');

/**
 * 指定した要素の子を全て削除
 * @param {HTMLElement}element
 */
removeAllChildren = (element)=>{
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}
userNameImput.onkeydown = event=>{
  if(event.key ==='Enter'){
    assessmentButton.onclick();
  }
}

assessmentButton.onclick = ()=>{
    const userName = userNameImput.value ;
    if(userName.length === 0){
      // 名前が空なら終了
      return;
    }
    console.log(userName);
    // 診断結果表示エリア
    removeAllChildren(resultDiv);

    const header =document.createElement('h3');  //!
    header.innerText = '診断結果';
    resultDiv.appendChild(header);
    
    const paragraph =document.createElement('p');
    const result =assessment(userName);
    paragraph.innerText = result;
    resultDiv.appendChild(paragraph);

    // ツイートエリア作成
    removeAllChildren(tweetDiv);
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたの良いところ')+
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    anchor.className ='twitter-hashtag-button';
    anchor.setAttribute('date-text',result);
    anchor.innerText='Tweet #あなたの良いところ診断';
    tweetDiv.appendChild(anchor);
    // widgets.js
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDiv.appendChild(script);
};


const answers =[
  
  '{userName}さんのいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}さんのいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}さんのいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}さんのいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}さんのいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}さんのいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}さんのいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}さんのいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}さんのいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}さんのいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}さんのいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}さんのいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}さんのいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}さんのいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}さんのいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}さんのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}さんのいいところは優しさです。{userName}の暖かい雰囲気や立ち振る舞いがみんなに癒しを与えています'
];

/** 
*名前の文字を渡すと診断結果を返す
* @param{string}  userName  ユーザー名
* @return{string}  診断結果
*/
// 全文字のコード番号を取得し合計する
assessment =(userName) =>{
  let sumPoint = 0
  for(let i = 0;i<userName.length;i++){
    sumPoint +=userName.charCodeAt(i);
  }
  // 文字コード番号の合計を回答の数でわって添字の数字を求める
  const index =sumPoint %answers.length;
  let result =answers[index];
  // todo {username}変換 正規表現
  result =result.replace(/\{userName\}/g,userName);

  return result;
}
// テストコード
console.assert(
  assessment('太郎') ===
    '太郎さんのいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
// 入力が同じ名前なら、同じ診断結果を出力する」処理が正しいか
console.assert(
  assessment('太郎')===
  assessment('太郎'),
  '入力名が同じなら診断結果の出力処理にミスがあります'

);

