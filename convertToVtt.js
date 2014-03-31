/*
For this to work until xmldoc has been updated with an option to add text as child nodes.
You have to manually change the method XmlElement.prototype._text to:

XmlElement.prototype._text = function(text) {
  if (text) { 
    this.val += text;
    
    // create nodes for text value also
    text = text.trim();
    if(text.length){
      var child = new XmlElement({ name: 'text' });
      child.val = text;

      // add to our children array
      this.children.push(child);

      // update first/last pointers
      if (!this.firstChild) this.firstChild = child;
      this.lastChild = child;

      delegates.unshift(child);
      delegates.shift();
    }
  }
}

*/
var xmldoc = require('xmldoc'), 
    fs = require('fs'),
    util = require('util');

var out = [];
var filename = "ttml/true_blood_short.ttml";

var stylePropToTagNameMap = {
    italic : 'i',
    bold : 'b',
    underline : 'u'
}
var timeMultMap = [3600, 60, 1]; 

fs.readFile(filename, 'utf8', function (err, data) {
    if(err) throw err; 

    var doc = new xmldoc.XmlDocument(data);
    var captionRoot = doc.descendantWithPath('body.div'); 
  
    out.push('WEBVTT\n');

    captionRoot.eachChild(convertNode);

    console.log(out.join('\n'));
  
});

function convertNode (node) {
    
    var begin = node.attr.begin, 
        duration = node.attr.dur || null, 
        value = convertTagsToText(node);

    var end = getEndFromStartAndDuration(begin, duration); 

    out.push(begin + ' ---> ' + end); 
    out.push(value+'\n');
}

function convertTagsToText(node){
	//console.log({value : node.val, children : node.children});
    var text = '';
    node.eachChild(function(child){
       switch ( child.name ){
           case 'br':
               text += '\n';
               break;
            case 'text':
                text += child.val;
                break;
            case 'span':
                text += wrapValueInTagFromStyle(child.val, child.attr.style);
                break;
            default :
            text += 'UKNOWN TAG ['+child.name+']';
       }
    });
    // remove initial whitespace characters
    text = text.replace(/^\s+/, '').trim();
    return text;
}
function wrapValueInTagFromStyle(value, styleProp){
    var tagName = stylePropToTagNameMap[styleProp];
    return util.format('<%s>%s</%s>', tagName, value.trim(), tagName);
}
function getEndFromStartAndDuration (begin, dur) { 
      
    var start =  begin.split(':').map(parseFloat).reduce(addTimeElements); 
  
    var end = start + dur.split(':').map(parseFloat).reduce(addTimeElements); 
  
    var h = Math.floor(end/timeMultMap[0]), 
        m = Math.floor(end % timeMultMap[0] / timeMultMap[1]), 
        s = end - h*timeMultMap[0] - m*timeMultMap[1], 
        ms = Math.round((s - Math.floor(s))*1000); 
  
    var endString = ('00' + h).slice(-2) + ':' + ('00' + m).slice(-2) + ':' + ('00' + Math.floor(s)).slice(-2) + '.' + ('000'+ms).slice(-3); 
    return endString; 
} 
function addTimeElements(prev, current, index) { 
    return prev + current * timeMultMap[index]; 
}