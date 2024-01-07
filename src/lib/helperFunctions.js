export const getSearchQuery = (paramKey = 'q') => {
    // get search term from url query param ?q=term
    const search = window.location.search;
    // get terms after q in url
    const params = new URLSearchParams(search);
    // get term from url
    const term = params.get(paramKey);
    console.log('SEARCH TERM', term); 
    return term;
}