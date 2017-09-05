import $ from 'jquery';
import ArticleBlock from './article_block';

class Page {
	constructor(article) {
		this.pages = [];
		this.article = article;
		this.article_block = new ArticleBlock();

		this.createPages();
		this.nextPage();
		this.prevPage();
		this.trackLoading();
	}

	createPages() {
		let pages = this.article.Pages;
		$.each(pages, (page_idx, page) => {
			// add page to stack
			this.addPage(page_idx);

			$.each(page, (block_idx, block) => {
				this.article_block.addBlock(block, page_idx);
			});
		});

		this.setActivePage(1); // set first page as active page. 
		$('.button--prev').fadeOut(300); // hide previous button
		this.trackLoading(1); // init progress tracker
	}

	addPage(idx) {
		let page = `<div class="pages__page page page--${idx}"></div>`;
		$('.pages').append(page);
		this.pages.push({'index': parseInt(idx), 'active': false});
	}

	setActivePage(idx) {
		$('.page').removeClass('page--active');

		// update pages array
		this.pages.map( (obj) => { obj.active = false } );
		this.pages[idx-1].active = true;

		$(`.page--${idx}`).addClass('page--active');
	}

	prevPage() {
		$('.button--prev').on('click', (e) => {
			e.preventDefault();

			// hide prev button if it's the first page
			let cur_idx = this.pages.filter((obj) => { return obj.active })[0].index;
			this.showHideButtons(cur_idx-1);
		});
	}

	nextPage() {
		$('.button--next').on('click', (e) => {
			e.preventDefault();
			// hide next button if it's the last page
			console.log(this.pages);
			let cur_idx = this.pages.filter((obj) => { return obj.active })[0].index;
			
			this.showHideButtons(cur_idx+1);
		});
	}

	showHideButtons(index) {
		// show / hide next button
		if (index == this.pages.length) {
			$('.button--next').fadeOut(300);
		}
		else {
			$('.button--next').fadeIn(300);
			this.setActivePage(index);
		}

		// show / hide prev buton
		if (index == 1) {
				$('.button--prev').fadeOut(300);
			}
		else {
			$('.button--prev').fadeIn(300);
			this.setActivePage(index);
		}

		// update progress bar
		this.trackLoading(index);

		$("html, body").animate({
			scrollTop: 0
		})
	}

	trackLoading(idx) {
		$('.progress').css('width', `${(idx / this.pages.length)*100}%`);
	}
}

module.exports = Page;