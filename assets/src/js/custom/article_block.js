import $ from 'jquery';

class ArticleBlock {
	constructor() {
	}

	addBlock(block, idx) {
		switch(block.Type) {
			case "Image":
				this.addImageBlock(block, idx);
				break;
			case "TextBlock":
				this.addTextBlock(block, idx);
				break;
			case "Ad Placeholder":
				this.addAdBlock(block, idx);
				break;
			case "VideoEmbed":
				this.addVideoBlock(block, idx);
				break;
			default:
				console.log(block);
				break;
		}
	}

	addImageBlock(block, idx) {
		let imageBlock = `<div class="page__block block block--image"><h2 class="block__title">${block.StrippedTitle}</h2><div class="block__content"><img src="http://${block.Url}" alt="" class="block__image" /><div class="block__overlay"><p class="block__caption">${block.StrippedCaption}</p></div></div></div>`;
		$(`.page--${idx}`).append(imageBlock);
	}

	addTextBlock(block, idx) {
		let textBlock = `<div class="page__block block block--text">${block.Content}</div>`;
		$(`.page--${idx}`).append(textBlock);
	}

	addAdBlock(block, idx) {
		let adBlock = `<div class="page__block block block--ad"></div>`;
		$(`.page--${idx}`).append(adBlock);
	}

	addVideoBlock(block, idx) {
		let src = block.Properties.mp4_url;
		let videoBlock = `<div class="page__block block block--video"><video class="video--${idx}" src="http://${src}" class="video--${idx}"></video></div>`;

		$(window).on('scroll', () => {
			let inView = this.isScrolledIntoView($(`.video--${idx}`));
			console.log($(`.video--${idx}`));
			if (inView) {
				$(`.video--${idx}`)[0].play();
			}
			else {
				$(`.video--${idx}`)[0].pause();
			}
		});
		$(`.page--${idx}`).append(videoBlock);
	}

	// I stole this snippet from github ;( 
	isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
}

module.exports = ArticleBlock;