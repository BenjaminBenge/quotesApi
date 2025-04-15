document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const dogImageElement = document.getElementById('dog-image');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const twitterBtn = document.getElementById('twitter-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    // Dog quotes database (fallback if API fails)
    const dogQuotes = [
        {
            quote: "Dogs do speak, but only to those who know how to listen.",
            author: "Orhan Pamuk"
        },
        {
            quote: "The better I get to know men, the more I find myself loving dogs.",
            author: "Charles de Gaulle"
        },
        {
            quote: "Dogs are not our whole life, but they make our lives whole.",
            author: "Roger Caras"
        },
        {
            quote: "No matter how little money and how few possessions you own, having a dog makes you rich.",
            author: "Louis Sabin"
        },
        {
            quote: "A dog is the only thing on earth that loves you more than you love yourself.",
            author: "Josh Billings"
        }
    ];
    
    // Fetch random dog image
    async function getDogImage() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            if (!response.ok) throw new Error('Dog API failed');
            const data = await response.json();
            dogImageElement.src = data.message;
            dogImageElement.alt = "Random dog";
            
            // Add hover effect
            dogImageElement.addEventListener('mouseenter', () => {
                dogImageElement.style.transform = 'scale(1.05)';
            });
            dogImageElement.addEventListener('mouseleave', () => {
                dogImageElement.style.transform = 'scale(1)';
            });
        } catch (error) {
            console.error('Error fetching dog image:', error);
            // Fallback dog image
            dogImageElement.src = 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&auto=format';
            dogImageElement.alt = "Default dog image";
        }
    }
    
    // Fetch dog-related quote
    async function getDogQuote() {
        try {
            quoteElement.textContent = "Fetching a pawsome quote...";
            authorElement.textContent = "";
            
            // Try API first
            const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=dogs', {
                headers: {
                    'X-Api-Key': 'YOUR_API_KEY' // Get free API key from https://api-ninjas.com/api/quotes
                }
            });
            
            if (!response.ok) throw new Error('Quote API failed');
            
            const data = await response.json();
            
            if (data.length > 0) {
                quoteElement.textContent = data[0].quote;
                authorElement.textContent = `— ${data[0].author || "Unknown"}`;
            } else {
                throw new Error('No quotes returned');
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Use local fallback
            const randomQuote = dogQuotes[Math.floor(Math.random() * dogQuotes.length)];
            quoteElement.textContent = randomQuote.quote;
            authorElement.textContent = `— ${randomQuote.author}`;
        }
    }
    
    // Load new quote and image
    async function loadNewContent() {
        await Promise.all([getDogImage(), getDogQuote()]);
    }
    
    // Tweet the current quote
    function tweetQuote() {
        const quote = quoteElement.textContent;
        if (quote === "Fetching a pawsome quote..." || quote.startsWith("Click")) return;
        
        const author = authorElement.textContent;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" ${author}`)}&hashtags=dogs,pets`;
        window.open(twitterUrl, '_blank');
    }
    
    // Copy quote to clipboard
    function copyQuote() {
        const quote = quoteElement.textContent;
        if (quote === "Fetching a pawsome quote..." || quote.startsWith("Click")) return;
        
        const author = authorElement.textContent;
        const textToCopy = `"${quote}" ${author}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
    
    // Event listeners
    newQuoteBtn.addEventListener('click', loadNewContent);
    twitterBtn.addEventListener('click', tweetQuote);
    copyBtn.addEventListener('click', copyQuote);
    
    // Load initial content
    loadNewContent();
});