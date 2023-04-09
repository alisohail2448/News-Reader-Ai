import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './style.js'
import wordsToNumbers from 'words-to-numbers';

const alanKey = 'c65956dec47376fff55af52bc5db43572e956eca572e1d8b807a3e2338fdd0dc/stage';


function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) =>{
        if(command === 'newHeadlines'){
          console.log(articles)
          setNewsArticles(articles)
          setActiveArticle(-1);
        }
        else if(command === 'highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if(command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if(parsedNumber > 20){
            alanBtn.playText('Please try that again.');
          }
          else if(article){
            window.open(articles[number].url, '_blank')
            alanBtn.playText('Opening...');
          }

        }
      }
    })
  }, [])
  

  return (
    <div className="">
      <div className={classes.logoContainer}>
        <img src="https://www.conversationdesigninstitute.com/assets/images/academy/POP/cover-card-EXT-Alan@2x.png" alt="logo" className={classes.alanLogo} />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
