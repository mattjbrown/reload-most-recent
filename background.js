chrome.omnibox.onInputEntered.addListener(function(text) {
        chrome.history.search({ text: text }, function(results) {            
            var prefixesToCheck = ['http://', 'https://', 'http://www.', 'https://www.']; 
            
            var mostRecentForHostname = _.find(results, function (historyItem) {                
                var hostMatches = false;
                
                _.each(prefixesToCheck, function (prefix) {
                    hostMatches = hostMatches || historyItem.url.indexOf(prefix + text) == 0;
                });
                
                return hostMatches;
            });
            
            chrome.tabs.create({ url: mostRecentForHostname.url });
            chrome.extension.getBackgroundPage().console.log(mostRecentForHostname);
        });
    }
);