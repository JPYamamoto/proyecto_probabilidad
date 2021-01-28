chrome.extension.onMessage.addListener((message, _sender, sendResponse) => {
  const wrapResponse = (response) => sendResponse({ response });
  const options = { currentWindow: true, active: true };

  chrome.tabs.query(options, ([{ id: tabID }]) => {
    console.log({ message });
    const options = {
      extension_trigger_single: () => {
        const andThenCompute = ({ raw_data }) => {
          const message = { action: "compute_rating_current", raw_data };
          chrome.tabs.sendMessage(tabID, message, wrapResponse);
        };

        const message = { action: "parse_dom_current" };
        chrome.tabs.sendMessage(tabID, message, andThenCompute);
      },

      extension_trigger_multiple: () => {
        const andThenCompute = ({ raw_data }) => {
          console.log({raw_data})
          raw_data
            ? raw_data?.forEach((vendedor) => {
                const message = { action: "compute_rating_many", raw_data };
                chrome.tabs.sendMessage(tabID, message, wrapResponse);
              })
            : wrapResponse();
        };

        const message = { action: "parse_dom_sellers" };
        chrome.tabs.sendMessage(tabID, message, andThenCompute);
      },
    };

    options[message]();
  });

  return true;
});
