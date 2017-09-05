import $ from 'jquery';
import Article from './custom/article';
import Page from './custom/page';

$(document).ready(function(){
	
	// let article_link = "https://cdn.diply.com/json/fun-adam-sandler-facts.json"; // adam sandler
	let article_link = "https://cdn.diply.com/json/changing-rooms-test.json"; // video article
	$.getJSON( article_link, function( article_return ) {

		new Article( article_return );

		new Page(article_return);
	});
});