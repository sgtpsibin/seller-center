export const getCurrentQuery = () => {
    if (!window.location.search) return {};
    let search = location.search.substring(1);
    let currentQuery = JSON.parse('{"' + decodeURIComponent(decodeURI(search))
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g,'":"') + '"}');

    Object.keys(currentQuery).map(key=>{
      if(key!=='query') {
        currentQuery[key]=currentQuery[key].split(',');
      }
    });
    
    return currentQuery ;
}