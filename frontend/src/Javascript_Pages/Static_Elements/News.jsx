import React from 'react';
import '../../Styling_Pages/Static_Elements/News.css';

const News = ({ newsSentiment }) => (
    <div className="news-sentiment-column">
        <h2>News Sentiment</h2>
        <div style={{overflowY: 'auto', maxHeight: '500px'}}>
            {newsSentiment && newsSentiment.feed.length > 0 ? (
                newsSentiment.feed.map((item, index) => (
                    <a href={`${item.url}`} target="_blank" rel="noopener noreferrer" key={index} style={{textDecoration: 'none', color: 'inherit'}}>
                        <div>
                            <h3>{item.title}</h3>
                            <img src={item.banner_image} alt={item.title} style={{width: "100px"}} />
                            <p>Overall Sentiment Score: {item.overall_sentiment_score}</p>
                            <p>Overall Sentiment Label: {item.overall_sentiment_label}</p>
                            {/* Add more properties here as needed */}
                        </div>
                    </a>
                ))
            ) : (
                <p>No relevant news</p>
            )}
        </div>
    </div>
);

export default News;