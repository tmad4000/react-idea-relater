export const  encodeHtmlEntity = function(str) {
  var buf = [];
  for (var i=str.length-1;i>=0;i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};


export const filterEntries = (entries, filter) => {
  const pdFilter = filter.toLowerCase();

  let fNotes = entries
  if(filter!=='')
    fNotes = entries.filter( (currNote) => currNote.txt.toLowerCase().indexOf(pdFilter) !== -1)

  const openPlaceHolder="4309jfei8jnasdf"
  const closePlaceHolder="0jf0893489j01q"

  fNotes=fNotes.map( (currNote) => {
      let txt = currNote.txt
      if(pdFilter.length > 0) {
        const r = new RegExp("("+pdFilter+")","ig")
        //txt = txt.replace(r, '<span style="font-weight:bold;background-color: yellow"}>$1</span>')
        txt = txt.replace(r, openPlaceHolder+'$1'+closePlaceHolder)
        txt = encodeHtmlEntity(txt).replace("&#10;","<br />")
        txt = txt.replace(new RegExp(encodeHtmlEntity(openPlaceHolder),'g'),'<span style="font-weight:bold;background-color: yellow"}>')
        txt = txt.replace(new RegExp(encodeHtmlEntity(closePlaceHolder),'g'),'</span>')
      }
      else {
        txt = encodeHtmlEntity(txt).replace("&#10;","<br />")
      }

      return Object.assign({}, currNote, {htmlTxt: txt});
  });


  return fNotes

}


export const shallowEqualsObj = (o1, o2, excludingKeys=[]) => {
    let ks = Object.keys(o1)
    
    for(let i=0;i<ks.length;i++) {
      if(excludingKeys.includes(ks[i]))
        continue;


      if( (ks[i] in o2) && o2[ks[i]]!==o1[ks[i]])
        return false;
    }
    return true
  }

export const seededRandom = (seed) => {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}