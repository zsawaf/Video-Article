import $ from 'jquery';

class Article {
	constructor(article) {
		this.article = article;

		this.getArticleHeader();
		this.getAuthorHeader();
	}

	/**
	*	Populate article header. 
	*/
	getArticleHeader() {
		// let's get all the variables we need.
		let article_title = this.article.Title;
		let article_img = this.article.MainImageUrl;
		let article_category = this.article.Category.Name;
		let article_date = this.article.PublishedAt.split("T")[0];
		$(".article__image").html(`<img src="http://${article_img}" alt="" />`);
		$(".article__title").html(article_title);
		$(".article__date").html(article_date);
		$(".article__category").html(article_category);
	}

	/*
	*	Populate author header
	*/
	getAuthorHeader() {

		let author = this.article.OriginalAuthor;
		let author_name = author.Name;
		let author_bio = author.Bio;
		let author_avatar = author.AvatarUrl;
		$(".author__image").html(`<img src="http://${author_avatar}" alt="" />`);
		$(".author__name").html(author_name);
		$(".author__bio").html(author_bio);
	}	
}

module.exports = Article;