const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import chai from 'chai';
import chaiImmutable from 'chai-immutable';


const doc  = (new JSDOM('<!doctype html><html><body></body></html>')).window;
const win  = new JSDOM('<!doctype html><html><body></body></html>');

global.document = doc;
global.window = win;

Object.keys(window).forEach(key => {
	if(!(key in global))
		global[key] = window[key];
});

chai.use(chaiImmutable);