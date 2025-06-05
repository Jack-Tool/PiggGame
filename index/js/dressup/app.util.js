(function ($) {
	var app = window.app;

	app.util = app.util || {};
	app.data = app.data || {};

	var dressup_util = {

		/**
		 * iPhoneネイティブのメソッドを呼び出して終了
		 * @type {function(string, string):void}
		 */
		finish: function (action, params) {
			if (!params) params = '';

			if (params.length > 0 && params.substr(0, 1) != '/') {
				params = '?' + params;
			} else {
				params = '?' + params;
				if (params == '?')
					params = '';
			}
			window.location.href = "pigg://" + action + params;
		},

		/**
		 * エラーポップアップの作成
		 * @param txt 	//errorText
		 * @param img 	//path
		 * @param btn 	//count
		 * @param e 	//hide,reload
		 */

		createPopup: function (txt, e) {

			var img = '',
				popup;

			if (e === 'hide')
				img = '<img alt="とじる" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAaCAYAAAD/nKG4AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQAxNC4xLjI3HPUINgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAANzSURBVFiF3VntlZswEBylAjo4Ogip4OggdBB3EKeCkA6uBFJBSAdcB1wFIR3gCiY/tJxlWSshIJf3Mu/xw0L7NaxWKxnwQLIm2dNiIln5c7aC5JnkIE9LssiUL0h2Il8f6FcpcbfyNKF5xhNqAPzw5jwbY3Y7RrIF8NUb/m6MOUVkzgAaAIMxpvV0XABUxpgpIFeIXBlQWwBYEqAE8KCYfwbQGGNmzbmBYdRaQGuh6Y7Mr7ypjWTA7Ix1iuyoxJGLp1hAJ0Vo+AdkFR4xk4y3MXna5XQUbrLqnfvDGNMB+B3w/ZEH1og1kPR3v+yD+PAE4AV2GX55S5/uwIzsol0WJ16LbhvRm5VZIuNm18iVGwJvMzKYMbSbWMvrZhaCGo9rbFKEawngTL0uBNc5N5AlciUzs5q23vW87rxPQkwt+gr5HSNVr1eeMS27NBKTBCiyUw4JeyFEpUjKb0vWEqPgzpjm2DE0JGMpaUtFDF2KpHehQdraMO7wb9ohexgoDTaAXwA+KdMuAH7C9lw1bYkp1xpoNmbVRFsbgobeMrNoy8jeXmugdnrh9SiRg14cCxLk6Q86lElCQSnSyvsz95UPHzNDhHH9l1gIyj3XhbCaLFqiXB971wfmf+i1mOl+HNrlkxJQl9gbkRXysUvo97H0VrXzNDIWS5ZuMVImDGTfDhxNFm1WBeHM0ZbfRLs8kzEIcaG2Yl4mtIGXi5Ejr2f2kKX5ODtzmoD/J3lXiY6Bt41qHbCl9ZiV1lnfrtMDkAo2IuffPrjovLm1kHKS3wXjx5k7HRFfa42s4RiKbhzQuuYyIlNF5MhE5nP9ptU6MtqSV8ki7cVbDhkV5eyovNfsaGfJE+NEdQl/zkmKrpgcOW3JF4bhG8wFF9hOfgTgL5lSngLAe0+mNsbcnACElM+KnRcAvaO3hn6Dudgo1VtMa28A8OgNfzDGjIov38SuLwMAL8aYKlUTtmIIOJ/addci3CgGyArILq1Dbk/WuIpTfVY2lAC0FF+LVUQdHFP3N5WTkasXbu+0R2bs0Ly/lt6Ce6IcA7UEs8fITOWvJMdO6k7JxWu/lAvaErPlrDiHbJqAjVdDsMV2SfsKtpiHMMkzwv5ttaZ/KgCcYItqhduC/uzo6u+EMyGBNwA+RqZdAAwAevkv4g4qWf8raJdy6Q2Paz7wH93SdjOQbj59AAAAAElFTkSuQmCC" />';
			else if (e === 'reload')
				img = '<img alt="更新する" src="data:image/png;base64,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" />';

			if ($('#popup').length > 0) {
				popup = $('#popup');
				popup.html('');
			} else {
				popup = $('<div id="popup" class="spg-dialog"></div>');
			}

			if (e === 'confirm') {

				var inner = '<p id="confirmMessage">' + txt + '</p><div class="center"><button id="popup-no" type="button" class="spg-button spg-gray"><img alt="いいえ" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAYCAMAAABnVuv4AAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAwECAEPCgkHAg4DCwYFDQINWltgAAAT9JREFUeF6llN12hCAMBvMrIrjL+z9ti9Vk47a52M4dZ/ALhwThYwTH1nklIvg/ZVzobuLRcYVAZhwcxmZZc7W+JDBlxunDgZNlLhBel0tiHLE034RhRYd8pMZpxNwRi4QwNr/NpUpuoNLKzAUnOsboEsLiATg3NO70GBbuUCU1PN74Pawebk3NOu6ozZ51yQ+wpabqGYGlqJW4jozgtMNSZqAyM9H5tWfBfpWLbSuJMepzTDaKTZL7o9sSc0E6JouAYcMY42tiJtaGsAXPOan29I6ClJiJLGHIQoE2z7x711Qyc1yXgWDI269EFiw1MX5dWtTCrnIGGLnZf8SzAU65E3HHBj6CtxKZKWeWhF+kWp2JNnAS0ywrhA3ytHvW36ZZVnym565aEFeBQGLQskC8qwt8hDCyFdgLflO4AXwBcZspIVJ5aaIAAAAASUVORK5CYII=" /></button><button id="popup-yes" type="button" class="spg-button spg-red"><img alt="はい" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAMAAACP1l7TAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAQMAQgPCgMCBgsHDQkFDgnFxbrAAAASRJREFUeF6FlNmywyAIhhHczcL7P+05igVjO+1/E5jMB4QlsClVjBl+6GSO5gVmrj+IxP8q6nYPxaQTY/qEtI74T8jBzMGA3BqJ5SeS3FD3DucyQOYup9UE5pBW5GKTRHdPBEcwM4s8FrmJaF1luF4RB3VDkiFrmkCGpPAgKrwhWdIY8pKF3hGII803hIaZ9zTlCyKmM0S+F78h9wy6NY0MoaaNXlp0gomkMkXSzSqyIR8TsCBRXlxAjyafpC1LAKXRso8oiBfPdNA8BK4Uu2s98xMZOcPldAmaXJJIu3BhLSDIOZCbbDu9BDVXpfXJaHFZS02zTsH24n4sf8V52nRMIr4fMoOush6SMBthQ777pb+IRxGlYnSwKcf5G8q+IsZC8EN/yhog23J4ZYsAAAAASUVORK5CYII=" /></button></div>';
				popup.append(inner);
				$('body').append(popup);

				//ダイアログtop座標を確定
				var top = (window.innerHeight - popup.height()) / 2 + document.body.scrollTop;
				//ダイアログにクラス付与＆表示
				popup.css('top', top);

				modalBg.show();

				$('#popup-no').bind('click', function () {
					$('#popup').hide();
					$('#popup').remove();
					modalBg.close();
				});

				$('#popup-yes').bind('click', function () {
					app.DressupView.removeAll();
					app.UseditemModel.removeUsedData();//localStorage['json.used']['json.choice']削除
					app.util.removeCache(app.config.piggCode + '.coordinateId');
					$('#useditem-list').children().remove();//サムネイル削除
					$('#closet-scroller').find('.selected').removeClass('selected');
					$('#popup').hide();
					$('#popup').remove();
					modalBg.close();
				});

			}
			else {
				var inner = '<p id="confirmMessage">' + txt + '</p><button id="popup-close" type="button" class="spg-button spg-red">' + img + '</button>'
				popup.append(inner);
				$('body').append(popup);

				//ダイアログtop座標を確定
				var top = (window.innerHeight - popup.height()) / 2 + document.body.scrollTop;
				//ダイアログにクラス付与＆表示
				popup.css('top', top);

				modalBg.show();

				$('#popup-close').bind('click', function () {

					if (e === 'hide') {
						$('#popup').hide();
						$('#popup').remove();
						modalBg.close();
					}
					else if (e === 'reload')
						window.location.reload();
				});
			}
			$('#modal-bg').bind('click', function () {
				$('#popup').hide();
				$('#popup').remove();
				modalBg.close();
			})
		},

		/**
		 * サムネイル作成
		 * @param src {string} <img> attribute src
		 * @param attr {Object}  <li>に付与する属性
		 */
		createThumbnail: function (src, attr , isDressup) {

			var img = new Image();
			if (isDressup) {
				img.name = src; //一時的に格納
			} else {
				img.src = src;
			}
			img.className = 'thumbImg';

			var li = $('<li />');
			var a = $('<button />', { 'type': 'button', 'class': 'spg-touch thumb' });
			var className = '';

			$.each(attr, function (name, value) {
				if (name === 'class') {
					className += ' ' + value;
				}
				li.attr(name, value);
			});

			a.append(img).appendTo(li);
			li.addClass(className);

			return $(li);
		},

		createBigThumbnail: function (src, attr) {

			var img = new Image();
			img.src = src;
			img.className = 'thumbImg';

			var li = $('<li />');
			var a = $('<button />', { 'type': 'button', 'class': 'spg-touch bigThumb' });
			var className = '';

			$.each(attr, function (name, value) {
				if (name === 'class') {
					className += ' ' + value;
				}
				li.attr(name, value);
			});

			a.append(img).appendTo(li);
			li.addClass(className);

			return $(li);
		},

		/**
		 * ピグの座標に基づくimg要素作成
		 * @param part {(number|string)} data-part Attribute
		 * @param className {string}  画像に付与するクラス名
		 * @param code {string} itemId_uniqueId
		 * @param obj {Object} 画像情報のオブジェクト
		 * @return {Object} HTML image Element
		 */
		createImage: function (part, className, code, obj) {
			var img = new Image();

			if (obj.data) {
				img.src = obj.data;
			} else if (obj.path) {
				img.src = obj.path;
			}

			if (part) { img.setAttribute("data-part", part); }
			if (className) { img.className = className; }
			if (code) { img.setAttribute('data-code', code); }

			if (part && part.indexOf('f_eye') > -1 && obj.order)
				img.style.zIndex = obj.order;

			img.style.top = obj.position.y - obj.origin.y + 'px';
			img.style.left = obj.position.x - obj.origin.x + 'px';
			img.setAttribute("width", obj.size.width);
			img.setAttribute("height", obj.size.height);

			return img;
		},

		/**
		 * Duffデバイス
		 * @param values {Array}
		 * @param process {function}
		 * @param arg {*}
		 * @param self {Object}
		 * @return {boolean}
		 */
		duff: function (values, process, arg, self) {
			var iterations = Math.floor(values.length / 8);
			var leftover = values.length % 8;
			var i = 0;

			if (leftover > 0) {
				do {
					process(values[i++], i, arg, self);
				} while (--leftover > 0);
			}

			if (iterations > 0) {
				do {
					process(values[i++], i, arg, self);
					process(values[i++], i, arg, self);
					process(values[i++], i, arg, self);
					process(values[i++], i, arg, self);
					process(values[i++], i, arg, self);
					process(values[i++], i, arg, self);
					process(values[i++], i, arg, self);
					process(values[i++], i, arg, self);

				} while (--iterations > 0);
			}
			return this;
		},


		/**
		 * キャッシュロード(localStorage)
		 * @param key {string} key of getItem
		 * @param target {string} session | local
		 * @return {boolean}
		 */
		loadCache: function (key, target) {
			if (target && target === 'session') {

				if (app.has.sessionStorage) {
					try {
						var item = window.sessionStorage.getItem(key);
						return item;
					} catch (e) {
						return false;
					}
				} else {
					/*
					key = key.replace(/\./g, '_');
					if(('storage' in window.app) && (key in window.app.storage)){
						return window.app.storage[key];
					}else{
						return null;
					}*/
					return null;
				}
			} else {
				if (app.has.localStorage) {
					try {
						var item = window.localStorage.getItem(key);
						return item;
					} catch (e) {
						return false;
					}
				} else {

					key = key.replace(/\./g, '_');

					if (('storage' in window.app) && (key in window.app.storage)) {
						return window.app.storage[key];
					} else {
						return null;
					}
				}


			}
		},

		/**
		 * キャッシュ保存 (WebStorage)
		 * @param key {string}
		 * @param val {string}
		 * @param target {string} session | local
		 * @return {boolean}
		 */
		saveCache: function (key, val, target) {
			if (target && target === 'session') {//session
				if (app.has.sessionStorage && typeof val !== 'object') {
					try {
						window.sessionStorage.removeItem(key);
						window.sessionStorage.setItem(key, val);
						return true;
					} catch (e) {
						return false;
					}
				} else {
					/*
					key = key.replace(/\./g, '_');
					if(('storage' in window.app) && (typeof val !== 'object')){
						return window.app.storage[key] = val;
					}else{
						return false;
					}*/
					return false;
				}
			} else {//local
				if (app.has.localStorage && typeof val !== 'object') {
					try {
						window.localStorage.removeItem(key);
						window.localStorage.setItem(key, val);
						return true;
					} catch (e) {
						return false;
					}
				} else {
					key = key.replace(/\./g, '_');
					if (('storage' in window.app) && typeof (val !== 'object')) {
						return window.app.storage[key] = val;
					} else {
						return false;
					}
				}
			}
		},
		/**
		 * キャッシュ削除
		 * @param key {string}
		 * @param target {string} session | local
		 * @return {boolean}
		 */
		removeCache: function (key, target) {
			if (target && target === 'session') {
				if (app.has.sessionStorage) {
					try {
						window.sessionStorage.removeItem(key);
						return true;
					} catch (e) {
						return false;
					}
				} else {
					/*
					key = key.replace(/\./g, '_');
					 if(('storage' in window.app) && (key in window.app.storage)){
						delete window.app.storage[key];
						return true;
					}else{
						return false;
					}*/
					return false;
				}
			} else {
				if (app.has.localStorage) {
					try {
						window.localStorage.removeItem(key);
						return true;
					} catch (e) {
						return false;
					}
				} else {
					key = key.replace(/\./g, '_');
					if (('storage' in window.app) && (key in window.app.storage)) {
						delete window.app.storage[key];
						return true;
					} else {
						return false;
					}
				}
			}
		},

		/**
		 * キャッシュ全削除
		 * @param target {string} session | local
		 * @return {boolean}
		 */
		clearCache: function (target) {
			if (target && target === 'session') {
				if (app.has.sessionStorage) {
					try {
						window.sessionStorage.clear();
						return true;
					} catch (e) {
						return false;
					}
				} else {
					return false;
				}
				// if(('storage' in window.app)){
				//	window.app.storage = {};
				//	return true;
				//}
			} else {
				if (app.has.localStorage) {
					try {
						window.localStorage.clear();
						return true;
					} catch (e) {
						return false;
					}
				} else if (('storage' in window.app)) {
					window.app.storage = {};
					return true;
				}
			}
		},

		/**
		 *  選択中のアイテムID保管庫を得る
		 * @return {Array}
		 */
		getChoice: function (prefix) {
			var choice = app.util.loadCache(prefix + '.choice');
			return ((choice) ? choice.split(',') : []);
		},

		/**
		 * 選択中のアイテムID保管庫に値をセットする
		 * @param code {string} itemid + '_' + uniqueid
		 * @return {Object]
		 */
		setChoice: function (prefix, code) {
			var choice = app.util.getChoice(prefix);
			var check = $.inArray(code, choice);
			if (check === -1) {
				choice.push(code);
				app.util.saveCache(prefix + '.choice', choice.toString());
			}
			return this;
		},

		/**
		 * 選択中のアイテムID保管庫から値を削除する
		 * @param code {string} itemid + '_' + uniqueid
		 * @return {Object} this
		 */
		removeChoice: function (prefix, code) {
			if (code) {
				var choice = app.util.getChoice(prefix);
				var check = $.inArray(code, choice);
				if (check !== -1) {
					choice.splice(check, 1);
					app.util.saveCache(prefix + '.choice', choice.toString());
				}
			} else {
				app.util.removeCache(prefix + '.choice');
			}
			return this;
		},

		/**
		 * 選択中のアイテムID保管庫に値があるかチェックする
		 *  @param code {string} itemid + '_' + uniqueid
		 */
		isChoice: function (prefix, code) {
			var choice = app.util.getChoice(prefix);
			return $.inArray(code, choice);
		},

		/**
		 * アメーバIDを得る
		 * @return {(string|null)
		 */
		getPiggCode: function () {
			var str = document.body.getAttribute('data-piggcode');
			if (typeof str === 'string') {
				//ハイフンとアンダーバー以外の記号除去
				return str.replace(/[\s\!-,\.-\/\:-@\[-\^\`\{-~]/g, '');
				//return str;
			} else {
				return null
			}
		},

		/**
		 * トークンを得る
		 * @return {string}
		 */
		getToken: function (target) {
			return document.body.getAttribute('data-' + target + 'token');
		},

		/**
		 * トークンのセッター
		 * @param target {string} profile | dressup
		 * @return {void}
		 */
		setToken: function (target, str) {
			document.body.setAttribute('data-' + target + 'token', str);
		},

		/**
		 * location.searchの値をキーを指定して得る
		 * @param name {string} key name
		 * @return {string}
		 */
		getSearchVal: function (name) {
			var search = window.location.search.replace(/[\?<>\(\)\-`~"']/g, '').split('&');
			for (var i = 0, x = search.length; i < x; i++) {
				var s = search[i].split('=');
				if (s[0] === name) {
					return s[1];
				}
			}
			return null;
		},

		/**
		 * location.searchの値を得る
		 * &と=で分割してオブジェクトに変換するだけ
		 * @return {Object.<string,string>}
		 */
		getSearches: function () {
			var search = window.location.search.replace(/[\?<>\(\)\-`~"']/g, '').split('&');
			var out = {};
			for (var i = 0, x = search.length; i < x; i++) {
				var s = search[i].split('=');
				out[s[0]] = s[1];
			}
			return out;
		},

		/**
		 * 秘密コマンド(笑)
		 * 各種キャッシュのクリア
		 * ?clear = coordinate
		 * ?clear = body
		 * ?clear = all
		 * #A7A7A7/#959595
		 * #FFDEE7/#F2B7C9
		 * ?set=bgc
		 */
		cCmds: function () {
			var aid = app.util.getPiggCode();
			var searches = app.util.getSearches();

			$.each(searches, function (key, val) {
				if (typeof key === 'string') {
					if (key === 'clear') {
						switch (val) {
							case 'coordinate':
								for (var z = 0; z < 6; z++) {
									app.util.removeCache(aid + '.coordinate.' + z + '.name');
									app.util.removeCache(aid + '.coordinate.' + z + '.data');
								}
								break;

							case 'body':
								app.util.removeCache(aid + '.json.body');
								break;

							case 'cache':
								app.util.clearCache();
								break;

							case 'cookie':
								$.cookie('navizou_news', null);
								$.cookie('spNews', null);
								$.cookie('spNews_new', null);
								break;

							default:
								return;
								break;
						}
					} else if (key = 'set') {
						switch (val) {
							case 'bgc':
								var $fie = $('<fieldset>', { 'id': 'bgc' });

								//PC版と同じ色
								var col = {
									'w': '#ffffff',
									'g': '#A7A7A7',
									'p': '#FFDEE7'
								};

								$.each(col, function (n, c) {
									//'<input type="radio" name="bgc" id="bgc'+n+'" class="bgci" value="'+c+'" />'
									$('<input>', { 'type': 'radio', 'name': 'bgc', 'id': 'bgc' + n, 'class': 'bgci', 'value': c }).appendTo($fie);
									$('<label>', { 'for': 'bgc' + n, 'class': 'bgcl ' + n })
										.appendTo($fie)
										.on('click', function () {
											$('#preview').css('background-color', $('#' + $(this).attr('for')).val());
										});

								});

								$('#home').append($fie);

								break;
							default:
								return;
								break;
						}
					}
				}
			});
		},

		/**
		 * カルーセルのナビゲーションを作成する
		 * @param $parent {Object} appendする親要素(jQuery Object)
		 * @param prefix {string} IDのプレフィックス
		 * @param indicatorChild {number} ●の数
		 * @return {Object} jQuery Object($parent)
		 */
		createCarouselNav: function ($parent, prefix, indicatorChild , allCnt) {
			var $indicator = $('<ul />', { 'id': prefix + '-indicator', 'class': 'indicator' });
			var $counter = $('<p />', { 'id': prefix + '-indicator','class': 'counter' });
			$counter.append("1 / " + allCnt);

			if (allCnt == null) { //コスメ
				if (indicatorChild < 2) {
					$parent
						.append($indicator);
				} else {
					$parent
						.append($('<button />', { 'type': 'button', 'class': 'spg-button spg-touch sprite disable prev arrow', 'id': prefix + '-prev' }).enableTap())//
						.append($('<button />', { 'type': 'button', 'class': 'spg-button spg-touch sprite disable next arrow', 'id': prefix + '-next' }).enableTap())//
						.append($indicator);
				}

				for (var i = 0; i < indicatorChild; i++) {
					var $li = $('<li />', { 'text': i, 'class': 'touch' });
					$indicator.append($li).enableTap();
					if (i === 0) {
						$li.addClass('enable');
					}
				}
			}
			else {
				if (indicatorChild < 2) {

				} else {
					$parent
						.append($('<button />', { 'type': 'button', 'class': 'spg-button spg-touch sprite disable prev arrow', 'id': prefix + '-prev' }).enableTap())//
						.append($('<button />', { 'type': 'button', 'class': 'spg-button spg-touch sprite disable next arrow', 'id': prefix + '-next' }).enableTap())//	
						.append($('<button />', { 'type': 'button', 'class': 'spg-button spg-touch sprite disable prev2 arrow', 'id': prefix + '-prev2' }).enableTap())//	
						.append($('<button />', { 'type': 'button', 'class': 'spg-button spg-touch sprite disable next2 arrow', 'id': prefix + '-next2' }).enableTap())//	
						.append($indicator)
						.append($counter);
					}
			}
			return $parent;
		},

		/**
		 * 持ち物カルーセル作成
		 * @return {void}
		 */
		setupClosetScroll: function (currentPage) {
			$('#closet-body').css('width', window.innerWidth);
			if (!app.closetScroll) {
				//iScroll initialize
				app.closetScroll = new IScroll('#closet-body', {
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: 'ul',
					snapSpeed: 400,
					click: true
				});

				$('#closet-prev').on(app.handleEventName, function () {
					if (app.closetScroll) {
						var current = app.closetScroll.currentPage.pageX - 1;
						app.handle.arrows($('#closet-nav'), current, app.data.closetPageNum);
						app.closetScroll.goToPage(current, 0, 500);
						if (app.ClosetView.categoryScrollStart) app.ClosetView.categoryScrollStart(app.closetScroll);
					}
				});

				$('#closet-next').on(app.handleEventName, function () {
					if (app.closetScroll) {
						var current = app.closetScroll.currentPage.pageX + 1;
						app.handle.arrows($('#closet-nav'), current, app.data.closetPageNum);
						app.closetScroll.goToPage(current, 0, 500);
						if (app.ClosetView.categoryScrollStart) app.ClosetView.categoryScrollStart(app.closetScroll);
					}
				});
				// 10ページもどる
				$('#closet-prev2').on(app.handleEventName, function () {
					if (app.closetScroll) {
						var current = app.closetScroll.currentPage.pageX - 10;
						app.handle.arrows($('#closet-nav'), current, app.data.closetPageNum);
						app.closetScroll.goToPage(current, 0, 500);
						if (app.ClosetView.categoryScrollStart)app.ClosetView.categoryScrollStart(app.closetScroll);
					}
				});
				// 10ページすすむ
				$('#closet-next2').on(app.handleEventName, function () {
					if (app.closetScroll) {
						var current = app.closetScroll.currentPage.pageX + 10;
						app.handle.arrows($('#closet-nav'), current, app.data.closetPageNum);
						app.closetScroll.goToPage(current, 0, 500);
						if (app.ClosetView.categoryScrollStart) app.ClosetView.categoryScrollStart(app.closetScroll);
					}
				});

				app.closetScroll.on("scrollEnd", function () {
					app.ClosetView.categoryScrollEnd(app.closetScroll);
				});

				if (currentPage) {
					app.closetScroll.goToPage(currentPage, 0, 0);
					app.ClosetView.categoryScrollEnd(app.closetScroll);
				}
				
				if (app.ClosetView.categoryScrollStart) { //
					app.closetScroll.on("scrollStart", function () {
						//console.log("scrollStart",app.closetScroll);
						app.ClosetView.categoryScrollStart(app.closetScroll, -1);
						app.ClosetView.categoryScrollStart(app.closetScroll, 1);
					});

					app.ClosetView.categoryScrollStart(app.closetScroll);
				}
				

			} else if (app.closetScroll) {
				setTimeout(function () {
					app.closetScroll.refresh();
				}, 200);
			}
		},

		sortUsed: function (data) {
			var ary = new Array();
			for (var i = 0, l = data.length; i < l; i++) {
				ary[data[i].used] = data[i];
			};
			var a = ary[0];
			if (!ary[0] || ary[0] === null || ary[0] === void 0) {
				var nAry = [];
				for (var i = 1, l = ary.length; i < l; i++) {
					nAry.push(ary[i]);
				};
				return nAry;
			}
			return ary;
		},

		faceChanged: function (id) {
			if (!id || id === void 0 || id === null || id === '')
				return false;
			var faceTime = app.util.loadCache(app.config.piggCode + '.facechangetime');
			if (!faceTime || faceTime === void 0 || faceTime === null || faceTime === '')
				return false;
			if (+faceTime >= +id)
				return true;
			else
				return false;
		},
		// ライドアイテムの可能性があるかチェック（Avatar.jsにてJSONチェック)
		checkRideItemCode: function (id) {
			for (var i = 0; i < rideCode.length; i++) {
				if (id.indexOf(rideCode[i]) !== -1) {
					return true;
				}
			}
			return false;
		},
		// 二重着用禁止ライドアイテムかチェック
		checkDoubleRideItem: function (id) {
			for (var i = 0; i < doubleDisableRideCode.length; i++) {
				if (id.indexOf(doubleDisableRideCode[i]) != -1) {
					return i;
				}
			}
			return -1;
		}

	};

	var rideCode = ["ride", "bike", "escargot", "segway", "vehicle", "skateboard", "segwey", "car_"];
	var doubleDisableRideCode = ["_airride_", "_pyonpyonride_", "_airridesuit_", "_tekutekuride_"];

	app.util = $.extend(true, {}, app.util, dressup_util);
	app.data.utilLoaded = true;
})(jQuery);