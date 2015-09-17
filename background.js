chrome.omnibox.onInputEntered.addListener(function(text) {
        chrome.history.search({ maxResults: 10, text: text, startTime: 0 }, function(results) {            
            var prefixesToCheck = ['http://', 'https://', 'http://www.', 'https://www.']; 
            
            var mostRecentForHostname = _.find(results, function (historyItem) {                
                var hostMatches = false;
                
                _.each(prefixesToCheck, function (prefix) {
                    hostMatches = hostMatches || historyItem.url.indexOf(prefix + text) == 0;
                });
                
                return hostMatches;
            });
            
            if (mostRecentForHostname)
            {
                chrome.tabs.create({ url: mostRecentForHostname.url });
            }
        });
    }
);