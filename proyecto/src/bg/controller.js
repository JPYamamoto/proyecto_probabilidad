chrome.extension.onMessage.addListener((message, _sender, sendResponse) => {
  const wrapResponse = (response) => sendResponse({ response });
  const options = { currentWindow: true, active: true };

  chrome.tabs.query(options, ([{ id: tabID }]) => {
    console.log({ message });
    const options = {
      extension_trigger_single: () => {
        const andThenCompute = ({ vendedor }) => {
          const message = { action: "compute_rating_current", vendedor };
          chrome.tabs.sendMessage(tabID, message, wrapResponse);
        };

        const message = { action: "parse_dom_current" };
        chrome.tabs.sendMessage(tabID, message, andThenCompute);
      },

      extension_trigger_multiple: () => {
        const andThenCompute = (data) => {
          data
            ? data.vendedores?.forEach((vendedor) => {
                const message = { action: "compute_rating_many", vendedor };
                chrome.tabs.sendMessage(tabID, wrapResponse);
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
