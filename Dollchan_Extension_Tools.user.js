// ==UserScript==
// @name			Dollchan Extension Tools
// @version			12.6.4.0
// @namespace		http://www.freedollchan.org/scripts/*
// @author			Sthephan Shinkufag @ FreeDollChan
// @copyright		(C)2084, Bender Bending Rodriguez
// @description		Doing some profit for imageboards
// @icon			https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Icon.png
// @updateURL		https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/stable/Dollchan_Extension_Tools.meta.js
// @include			*
// ==/UserScript==

(function (scriptStorage) {
'use strict';
var defaultCfg = {
	'version':	'12.6.4.0',
	'lang':		0,		// script language [0=ru, 1=en]
	'sstyle':	0,		// script elements style [0=glass blue, 1=gradient blue, 2=solid grey]
	'spells':	0,		// hide posts by magic spells
	'awipe':	1,		// antiwipe detectors:
	'samel':	1,		//		same lines
	'samew':	1,		//		same words
	'longp':	1,		//		long posts
	'longw':	1,		//		long words
	'caps':		0,		//		cAsE, CAPS
	'specs':	0,		//		special symbols
	'nums':		1,		//		numbers
	'menuhd':	1,		// menu on hide button
	'viewhd':	1,		// view hidden on postnumber
	'delhd':	0,		// delete hidden posts [0=off, 1=merge, 2=full hide]
	'filthr':	1,		// filter threads
	'updthr':	1,		// update threads [0=off, 1=auto, 2=click+count, 3=click]
	'updint':	2,		//		threads update interval
	'updfav':	1,		//		favicon blinking, if new posts detected
	'navig':	2,		// >>links navigation [0=off, 1=no map, 2=+refmap]
	'navdel':	'1500',	//		delay in ms
	'nashow':	'100',	//		show timeout
	'navmrk':	0,		//		mark viewed posts
	'navhid':	0,		//		strike hidden posts in refmap
	'navdis':	0,		//		don't show hidden posts
	'expimg':	2,		// expand images by click [0=off, 1=in post, 2=by center]
	'expost':	2,		// expand shorted posts [0=off, 1=auto, 2=on click]
	'ctime':	0,		// correct time in posts
	'ctmofs':	'-2',	//		offset
	'ctmpat':	'',		//		pattern
	'insnum':	1,		// insert >>link on postnumber click
	'animp':	1,		// animation in script
	'aclose':	0,		// auto-close popups
	'rtitle':	1,		// replace page title in threads
	'attach':	1,		// attach main panel
	'icount':	1,		// show posts/images counter
	'showmp':	0,		// show full main panel
	'ospoil':	1,		// open spoilers
	'noname':	0,		// hide post names
	'noscrl':	1,		// hide scrollers in posts
	'mp3':		1,		// mp3 player by links
	'addimg':	1,		// add images by links
	'imgsrc':	1,		// image search
	'ytube':	3,		// YouTube links embedder [0=off, 1=onclick, 2=player, 3=preview+player, 4=only preview]
	'yptype':	0,		//		player type [0=flash, 1=HTML5 <iframe>, 2=HTML5 <video>]
	'ywidth':	360,	//		player width
	'yheigh':	270,	//		player height
	'yhdvid':	0,		//		hd video quality
	'ytitle':	0,		//		convert links to titles
	'verify':	1,		// reply without reload (verify on submit)
	'addfav':	1,		// add thread to favorites on reply
	'keynav':	0,		// keyboard navigation
	'sagebt':	1,		// email field -> sage btn
	'svsage':	1,		//		remember sage
	'issage':	0,		//		reply with sage
	'pform':	2,		// postform is [0=at top, 1=at bottom, 2=hidden]
	'tform':	1,		// hide thread-creating form
	'forcap':	1,		// language input in captcha [0=off, 1=en, 2=ru]
	'txtbtn':	1,		// text format buttons [0=off, 1=graph, 2=text, 3=usual]
	'txtpos':	0,		//		position at [0=top, 1=bottom]
	'name':		0,		// user name
	'namval':	'',		//		value
	'passw':	0,		// user password
	'pasval':	'',		//		value
	'sign':		0,		// user signature
	'sigval':	'',		//		value
	'norule':	1,		// hide board rules
	'nogoto':	1,		// hide goto field
	'nopass':	1,		// hide password field
	'mask':		0,		// mask images
	'texw':		530,	// textarea width
	'texh':		140,	// textarea height
	'enupd':	1,		// check for script's update
	'betaupd':	0,		// 		check for beta-version
	'lupdchk':	0,		// 		last update check
	'supdint':	2,		// 		update interval in days (0=on page load)
	'pimgs':	0,		// preload images
	'rarjpeg':	0,		// detect rarjpegs
	'rExif':	1,		// remove EXIF data from JPEGs
	'sImgs':	1		// ability to post same images
},

Lng = {
	cfg: {
		spells:		['Заклинания: ', 'Magic spells: '],
		awipe:		['Анти-вайп детекторы ', 'Anti-wipe detectors '],
		samel:		['Повтор строк', 'Same lines'],
		samew:		['Повтор слов', 'Same words'],
		longp:		['Длинные посты', 'Long posts'],
		longw:		['Длинные слова', 'Long words'],
		specs:		['Спецсимволы', 'Special symbols'],
		caps:		['КАПС/реГисТР', 'CAPS/cAsE'],
		nums:		['Числа', 'Numbers'],
		filthr:		['Применять фильтры к тредам', 'Apply filters to threads'],
		menuhd:		['Дополнительное меню кнопок скрытия ', 'Additional menu of hide buttons'],
		viewhd:		['Просмотр скрытого по №поста*', 'View hidden on №postnumber*'],
		delhd: {
			sel:	[['Не изменять', 'Объединять', 'Удалять'], ['Skip', 'Merge', 'Delete']],
			txt:	['скрытые посты', 'hidden posts']
		},

		updthr: {
			sel:	[['Откл.', 'Авто', 'Счет+клик', 'По клику'], ['Disable', 'Auto', 'Count+click', 'On click']],
			txt:	['подгрузка новых постов в треде*', 'loading new posts in thread*']
		},
		updint: {
			sel:	[[0.5, 1, 1.5, 2, 5, 15, 30], [0.5, 1, 1.5, 2, 5, 15, 30]],
			txt:	['(мин) интервал проверки*', '(min) update interval*']
		},
		updfav:		['мигать фавиконом при новых постах*', 'Favicon blinking on new posts*'],
		expost: {
			sel:	[['Откл.', 'Авто', 'По клику'], ['Disable', 'Auto', 'On click']],
			txt:	['загрузка сокращенных постов*', 'upload of shorted posts*']
		},
		expimg: {
			sel:	[['Откл.', 'В посте', 'По центру'], ['Disable', 'In post', 'By center']],
			txt:	['раскрывать изображения ', 'expand images ']
		},
		pimgs:		['Предварительно загружать изображения*', 'Pre-load images*'],
		rarjpeg:	['Распознавать RarJpeg\'и в изображениях*', 'Detect RarJpegs in images*'],
		imgsrc:		['Добавлять кнопки для поиска изображений*', 'Add image search buttons*'],
		ospoil:		['Открывать спойлеры', 'Open spoilers'],
		noname:		['Скрывать имена в постах', 'Hide names in posts'],
		noscrl:		['Без скролла в постах', 'No scroll in posts'],
		keynav:		['Навигация с помощью клавиатуры* ', 'Navigation with keyboard* '],
		ctime:		['Корректировать время в постах* ', 'Correct time in posts* '],
		ctmofs:		[' Разница во времени', ' Time difference'],
		ctmpat:		['Шаблон замены', 'Replace pattern'],

		navig: {
			sel:	[['Откл.', 'Без карты', 'С картой'], ['Disable', 'No map', 'With map']],
			txt:	['навигация по >>ссылкам* ', 'navigation by >>links* ']
		},
		nashow:		[' задержка появления (мс)', ' delay appearance (ms)'],
		navdel:		[' задержка пропадания (мс)', ' delay disappearance (ms)'],
		navmrk:		['Отмечать просмотренные посты*', 'Mark viewed posts*'],
		navhid:		['Зачеркивать >>ссылки на скрытые посты*', 'Strike >>links to hidden posts*'],
		navdis:		['Не отображать превью для скрытых постов', 'Don\'t show previews for hidden posts'],
		insnum:		['Вставлять >>ссылку по клику на №поста*', 'Insert >>link on №postnumber click*'],
		mp3:		['Добавлять плейер к mp3-ссылкам* ', 'Add player to mp3-links* '],
		addimg:		['Загружать изображения к .jpg-, .png-, .gif-ссылкам*', 'Load images to .jpg-, .png-, .gif-links*'],
		ytube: {
			sel:	[['Ничего', 'Плейер по клику', 'Авто плейер', 'Превью+плейер', 'Только превью'], ['Nothing', 'On click player', 'Auto player', 'Preview+player', 'Only preview']],
			txt:	['к YouTube-ссылкам* ', 'to YouTube-links* ']
		},
		yptype: {
			sel:	[['Flash', 'HTML5 iframe', 'HTML5 video'], ['Flash', 'HTML5 iframe', 'HTML5 video']],
			txt:	[' ', ' ']
		},
		yhdvid:		['HD ', 'HD '],
		ytitle:		['Загружать названия к YouTube-ссылкам*', 'Load titles into YouTube-links*'],

		pform: {
			sel:	[['Сверху', 'Внизу', 'Скрытая'], ['At top', 'At bottom', 'Hidden']],
			txt:	['форма ответа в треде* ', 'reply form in thread* '],
		},
		tform:		['Прятать форму создания треда', 'Hide thread creating form'],
		addfav:		['Добавлять тред в избранное при ответе', 'Add thread to favorites on reply'],
		verify:		['Постить ответ без перезагрузки*', 'Posting reply without reload*'],
		sImgs:		['Возможность отправки одинаковых изображений', 'Ability to post same images'],
		rExif:		['Удалять EXIF-данные из JPEG-изображений', 'Remove EXIF-data from JPEG-images'],
		sagebt:		['Sage вместо поля E-mail* ', 'Sage button instead of E-mail field* '],
		svsage:		['запоминать сажу', 'remember sage'],
		forcap: {
			sel:	[['Откл.', 'Eng', 'Rus'], ['Disable', 'Eng', 'Rus']],
			txt:	['язык ввода капчи', 'language input in captcha']
		},
		txtbtn: {
			sel:	[['Откл.', 'Графич.', 'Упрощ.', 'Стандарт.'], ['Disable', 'As images', 'As text', 'Standard']],
			txt:	['кнопки форматирования текста ', 'text format buttons ']
		},
		txtpos:		['внизу', 'at bottom'],
		name:		['Постоянное имя', 'Fixed name'],
		passw:		['Постоянный пароль', 'Fixed password'],
		sign:		['Постоянная подпись', 'Fixed signature'],
		norule:		['правила ', 'rules '],
		nogoto:		['поле goto ', 'goto field '],
		nopass:		['пароль', 'password'],
		
		sstyle: {
			sel:	[['Glass blue', 'Gradient blue', 'Solid grey'], ['Glass blue', 'Gradient blue', 'Solid grey']],
			txt:	[' стиль скрипта', ' script style']
		},
		attach:		['Прикрепить главную панель ', 'Attach main panel '],
		icount:		['Счетчик постов/изображений в треде', 'Posts/images counter in thread'],
		rtitle:		['Название треда в заголовке вкладки*', 'Thread name in page title*'],
		animp:		['Включить анимацию в скрипте', 'Enable animation in script'],
		aclose:		['Автоматически закрывать уведомления', 'Close popups automatically'],
		enupd:		['Включить авто-проверку на обновления', 'Enable Auto Update-сheck'],
		supdint: {
			sel:	[['Всегда', 'Каждый день', 'Каждые 2 дня', 'Каждую неделю', 'Каждые 2 недели', 'Каждый месяц'], ['Always', 'Every day', 'Every 2 days', 'Every week', 'Every 2 week', 'Every month']],
			txt:	['Интервал проверки', 'Check interval'],
		},
		betaupd:	['Проверять обновления для beta-версии', 'Check updates for beta-version'],

		lang: {
			sel: [['Ru', 'En'], ['Ru', 'En']],
			txt: ['', '']
		}
	},

	txtBtn: {
		Bold:		['Жирный', 'Bold'],
		Italic:		['Наклонный', 'Italic'],
		Under:		['Подчеркнутый', 'Underlined'],
		Strike:		['Зачеркнутый', 'Strike'],
		Spoil:		['Спойлер', 'Spoiler'],
		Code:		['Код', 'Code'],
		Quote:		['Цитировать выделенное', 'Quote selected']
	},

	cfgTab: {
		Filters:	['Фильтры', 'Filters'],
		Posts:		['Посты', 'Posts'],
		Links:		['Ссылки', 'Links'],
		Form:		['Форма', 'Form'],
		Common:		['Общее', 'Common'],
		Info:		['Инфо', 'Info']
	},

	panelBtn: {
		Settings:	['Настройки', 'Settings'],
		Hidden:		['Скрытое', 'Hidden'],
		Favor:		['Избранное', 'Favorites'],
		Refresh:	['Обновить', 'Refresh'],
		GoBack:		['Назад', 'Go back'],
		GoNext:		['Следующая', 'Next'],
		GoUp:		['Наверх', 'To the top'],
		GoDown:		['В конец', 'To the bottom'],
		NewThr:		['Создать тред', 'New thread'],
		ExpImg:		['Раскрыть картинки', 'Expand images'],
		MaskImg:	['Маскировать картинки', 'Mask images'],
		UpdOn:		['Автообновление треда', 'Thread autoupdate'],
		Catalog:	['Каталог', 'Catalog'],
		counter:	['Постов/Изображений в треде', 'Posts/Images in thread']
	},

	selHiderMenu:	[
		['Скрывать выделенное', 'Скрывать изображение', 'Скрыть схожий текст'],
		['Hide selected text', 'Hide same images', 'Hide similar text']
	],
	selExpandThrd:	[
		['5 постов', '15 постов', '30 постов', '50 постов', '100 постов'],
		['5 posts', '15 posts', '30 posts', '50 posts', '100 posts']
	],
	selAjaxPages:	[
		['1 страница', '2 страницы', '3 страницы', '4 страницы', '5 страниц'],
		['1 page', '2 pages', '3 pages', '4 pages', '5 pages']
	],

	add:			['Добавить', 'Add'],
	apply:			['Применить', 'Apply'],
	clear:			['Очистить', 'Clear'],
	refresh:		['Обновить', 'Refresh'],
	load:			['Загрузить', 'Load'],
	save:			['Сохранить', 'Save'],
	edit:			['Правка', 'Edit'],
	reset:			['Сброс', 'Reset'],
	remove:			['Удалить', 'Remove'],
	info:			['Инфо', 'Info'],
	undo:			['Отмена', 'Undo'],
	loading:		['Загрузка...', 'Loading...'],
	checking:		['Проверка...', 'Checking...'],
	deleting:		['Удаление...', 'Deleting...'],
	error:			['Ошибка:', 'Error:'],
	noConnect:		['Ошибка подключения', 'Connection failed'],
	thrdNotFound:	['Тред недоступен (№', 'Thread is unavailable (№'],
	succDeleted:	['Пост(ы) удален(ы)!', 'Post(s) deleted!'],
	errDelete:		['Не могу удалить пост(ы)!', 'Can\'t delete post(s)!'],
	cTimeError:		['Неправильная разница во времени', 'Invalid time difference'],
	cookiesLimit:	['Превышен лимит cookies', 'Cookies limit overflow'],
	noGlobalCfg:	['Глобальные настройки не найдены', 'Global config not found'],
	postNotFound:	['Пост не найден', 'Post not found'],
	checkNow:		['Проверить сейчас', 'Check now'],
	updAvail:		['Доступно обновление!', 'Update available!'],
	haveLatest:		['У вас стоит самая последняя версия!', 'You have latest version!'],
	version:		['Версия: ', 'Version: '],
	storage:		['Хранение: ', 'Storage: '],
	thrViewed:		['Тредов просмотрено: ', 'Threads viewed: '],
	thrCreated:		['Тредов создано: ', 'Threads created: '],
	pstSended:		['Постов отправлено: ', 'Posts sended: '],
	total:			['Всего: ', 'Total: '],
	dontShow:		['Не отображать: ', 'Do not show: '],
	showMore:		['Показать подробнее', 'Show more'],
	loadGlobal:		['Загрузить глобальные настройки', 'Load global settings'],
	saveGlobal:		['Сохранить настройки как глобальные', 'Save settings as global'],
	resetCfg:		['Сбросить в настройки по умолчанию', 'Reset settings to defaults'],
	saveChanges:	['Сохранить внесенные изменения', 'Save your changes'],
	editInTxt:		['Правка в текстовом формате', 'Edit in text format'],
	infoCount:		['Обновить счетчики постов', 'Refresh posts counters'],
	clrDeleted:		['Очистить записи недоступных тредов', 'Clear notes of inaccessible threads'],
	clrSelected:	['Удалить выделенные записи', 'Remove selected notes'],
	hiddenPosts:	['Скрытые посты', 'Hidden posts'],
	hiddenThrds:	['Скрытые треды', 'Hidden threads'],
	onPage:			[' на странице', ' on page'],
	noHidThrds:		['Нет скрытых тредов...', 'No hidden threads...'],
	noHidOnPage:	['На этой странице нет скрытого...', 'Nothing to hide on this page...'],
	expandAll:		['Раскрыть все', 'Expand all'],
	noFavorites:	['Нет избранных тредов...', 'Favorites is empty...'],
	replies:		['Ответы:', 'Replies:'],
	postsOmitted:	['Пропущено ответов: ', 'Posts omitted: '],
	collapseThrd:	['Свернуть тред', 'Collapse thread'],
	deleted:		['удалён', 'deleted'],
	getNewPosts:	['Получить новые посты', 'Get new posts'],
	page:			[' страница', ' page'],
	hiddenThrd:		['Скрытый тред:', 'Hidden thread:'],
	expandForm:		['Раскрыть форму', 'Expand form'],
	search:			['Искать в ', 'Search in '],
	reply:			['Ответ', 'Reply'],
	wait:			['Ждите', 'Wait'],
	makeRjpeg:		['Сделать Rarjpeg', 'Make Rarjpeg'],
	keyNavHelp:		[
		'На доске:\n"J" - тред ниже,\n"K" - тред выше,\n"N" - пост ниже,\n"M" - пост выше,\n"V" - вход в тред\n\nВ треде:\n"J" - пост ниже,\n"K" - пост выше,\n"V" - быстрый ответ',
		'On board:\n"J" - thread below,\n"K" - thread above,\n"N" - post below,\n"M" - post above,\n"V" - enter a thread\n\nIn thread:\n"J" - post below,\n"K" - post above,\n"V" - quick reply'
	]
},

doc = window.document,
Cfg = {}, Favor = {}, hThrds = {}, Stat = {}, Posts = [], pByNum = [], tByCnt = [], Visib = [], Expires = [],
nav = {}, sav = {}, aib = {}, brd, res, TNum, pageNum, docExt, docTitle, favIcon, favIconInterval,
pr = {}, dForm, oeForm, pPanel, opPanel, dummy, postWrapper = false,
Pviews = {isActive: false, current: null, deleted: [], ajaxed: {}, overDelay: null, outDelay: null},
pSpells = {}, tSpells = {}, oSpells = {}, spellsList = [],
oldTime, endTime, timeLog = '',
timePattern, timeRegex,
ajaxInterval, lCode, hideTubeDelay, quotetxt = '', liteMode = false, isExpImg = false, isKeyNav = true,
storageLife = 5*24*3600*1000;


/*==============================================================================
									UTILITES
==============================================================================*/

function $$X(path, root, dc) {
	return dc.evaluate(path, root, null, 7, null);
}

function $X(path, root) {
	return $$X(path, root, doc);
}

function $$x(path, root, dc) {
	return dc.evaluate(path, root, null, 8, null).singleNodeValue;
}

function $x(path, root) {
	return $$x(path, root, doc);
}

function $xb(path, root) {
	return doc.evaluate(path, root, null, 3, null).booleanValue;
}

function $c(id, root) {
	return root.getElementsByClassName(id)[0];
}

function $id(id) {
	return doc.getElementById(id);
}

function $t(id, root) {
	return root.getElementsByTagName(id)[0];
}

function $each(list, fn) {
	var i = 0, el;
	if(list) {
		while(el = list.snapshotItem(i++)) {
			fn(el, i - 1);
		}
	}
}

function $html(el, htm) {
	var cln = el.cloneNode(false);
	cln.innerHTML = htm;
	el.parentNode.replaceChild(cln, el);
	return cln;
}

function $attr(el, attr) {
	for(var key in attr) {
		key === 'text' ? el.textContent = attr[key]
		: key === 'value' ? el.value = attr[key]
		: el.setAttribute(key, attr[key]);
	}
	return el;
}

function $event(el, events) {
	for(var key in events) {
		el.addEventListener(key, events[key], false);
	}
	return el;
}

function $rattr(el, attr) {
	if(el.getAttribute(attr)) {
		el.removeAttribute(attr);
	}
	if(nav.Opera && el[attr]) {
		el[attr] = '';
	}
}

function $revent(el, events) {
	for(var key in events) {
		el.removeEventListener(key, events[key], false);
	}
}

function $append(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i]) {
			el.appendChild(nodes[i]);
		}
	}
}

function $before(el, nodes) {
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i]) {
			el.parentNode.insertBefore(nodes[i], el);
		}
	}
}

function $after(el, node) {
	el.parentNode.insertBefore(node, el.nextSibling);
}

function $add(htm) {
	dummy.innerHTML = htm;
	return dummy.firstChild;
}

function $$new(tag, attr, events, dc) {
	var el = dc.createElement(tag);
	if(attr) {
		$attr(el, attr);
	}
	if(events) {
		$event(el, events);
	}
	return el;
}

function $new(tag, attr, events) {
	return $$new(tag, attr, events, doc);
}

function $New(tag, attr, nodes) {
	var el = $new(tag, attr, null);
	$append(el, nodes);
	return el;
}

function $txt(el) {
	return doc.createTextNode(el);
}

function $btn(val, ttl, fn) {
	return $new('input', {
		'type': 'button',
		'value': val,
		'title': ttl}, {
		'click': fn
	});
}

function $if(cond, el) {
	return cond ? el : null;
}

function $disp(el) {
	el.style.display = el.style.display === 'none' ? '' : 'none';
}

function $del(el) {
	if(el) {
		el.parentNode.removeChild(el);
	}
}

function $$Del(path, root, dc) {
	$each($$X(path, root, dc), function(el) {
		$del(el);
	});
}

function $Del(path, root) {
	$$Del(path, root, doc)
}

function $offset(el) {
	var box = el.getBoundingClientRect();
	return {
		top: Math.round(box.top + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset)
	};
}

function getStyle(el, prop) {
	return doc.defaultView && doc.defaultView.getComputedStyle
		? doc.defaultView.getComputedStyle(el, '').getPropertyValue(prop) : '';
}

function $focus(el) {
	window.scrollTo(0, $offset(el).top);
}

function $pd(e) {
	e.preventDefault();
}

function $rnd() {
	return Math.round(Math.random()*1e10).toString(10);
}

function insertInto(el, txt) {
	var scrtop = el.scrollTop,
		start = el.selectionStart;
	el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

function txtSelection() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}

function strToRegexp(str) {
	var t = str.match(/\/.*?[^\\]\/[ig]*/)[0],
		l = t.lastIndexOf('/');
	return new RegExp(t.substr(1, l - 1), t.substr(l + 1));
}

function isEmptyObj(obj) {
	for(var i in obj) {
		return false;
	}
	return true;
}

function $uneval(obj) {
	return unescape(uneval(obj).replace(/\\u/g, '%u'));
}

function HTMLtoDOM(html) {
	var myDoc, el, first;
	try {
		myDoc = (new DOMParser()).parseFromString(html, 'text/html');
	} catch (e) {}
	if(!myDoc || !myDoc.body) {
		myDoc = doc.implementation.createHTMLDocument('');
		el = myDoc.documentElement;
		el.innerHTML = html;
		first = el.firstElementChild;
		if(el.childElementCount === 1 && first.localName.toLowerCase() === 'html') {
			myDoc.replaceChild(first, el);
		}
	}
	return myDoc;
}

function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += txt + ': ' + (newTime - oldTime) + 'ms\n';
	oldTime = newTime;
}

function fixFunctions() {
	if(!('head' in doc)) {
		doc.head = $t('head', doc);
	}
	if(aib.hid) {
		window.setTimeout = function(fn, num) {
			if(typeof fn === 'function') fn();
			return 1;
		};
	}
	if(!String.prototype.trim) {
		String.prototype.trim = function () {
			var str = this.replace(/^\s\s*/, ''),
				s = /\s/,
				i = str.length;
			while(s.test(str.charAt(--i))) {}
			return str.slice(0, i + 1);
		};
	}
	if(typeof uneval !== 'function') {
		(function(){var f=[],g={"\t":"t","\n":"n","\u000b":"v","\u000c":"f","\r":"\r","'":"'",'"':'"',"\\":"\\"},h=function(b){if(b in g)return"\\"+g[b];var c=b.charCodeAt(0);return c<32?"\\x0"+c.toString(16):c<127?"\\"+b:c<256?"\\x"+c.toString(16):c<4096?"\\u0"+c.toString(16):"\\u"+c.toString(16)},i=function(b){return b.toString()},j={"boolean":i,number:i,string:function(b){return"'"+b.toString().replace(/[\x00-\x1F\'\"\\\u007F-\uFFFF]/g,h)+"'"},undefined:function(){return"undefined"},"function":i}, k=function(b,c){var a=[],d;for(d in b)b.hasOwnProperty(d)&&(a[a.length]=uneval(d)+":"+uneval(b[d],1));return c?"{"+a.toString()+"}":"({"+a.toString()+"})"},uneval_set=function(b,c,a){f[f.length]=[b,c];j[c]=a||k};uneval_set(Array,"array",function(b){for(var c=[],a=0,d=b.length;a<d;a++)c[a]=uneval(b[a]);return"["+String(c)+"]"});uneval_set(RegExp,"regexp",i);uneval_set(Date,"date",function(b){return"(new Date("+b.valueOf()+"))"});window.uneval=function(b,c){var a;if(b===void 0)a="undefined";else if(b===null)a= "null";else{a:if(a=typeof b,a=="object"){a=0;for(var d=f.length;a<d;a++)if(b instanceof f[a][0]){a=f[a][1];break a}a="object"}a=(j[a]||k)(b,c)}return a}})();
	}
	if(!('GM_log' in window)) {
		window.GM_log = function() {};
	}
	if(!('GM_xmlhttpRequest' in window)) {
		window.GM_xmlhttpRequest = function(obj) {
			var h,
				xhr = new window.XMLHttpRequest();
			xhr.onreadystatechange = function() {
				obj.onreadystatechange(xhr);
			};
			xhr.onload = function() {
				try{
					obj.onload(xhr);
				} catch(e) {}
			};
			xhr.open(obj.method, obj.url, true);
			xhr.setRequestHeader('Accept-Encoding', 'deflate, gzip, x-gzip');
			for(h in obj.headers) {
				xhr.setRequestHeader(h, obj[h]);
			}
			xhr.finalUrl = obj.url;
			xhr.send(null);
		};
	}
}


/*==============================================================================
								STORAGE / CONFIG
==============================================================================*/

function setCookie(name, value, life) {
	if(name) {
		doc.cookie = escape(name) + '=' + escape(value) + ';expires='
			+ (new Date((new Date()).getTime() + life)).toGMTString() + ';path=/';
	}
}

function getCookie(name) {
	var one,
		arr = doc.cookie.split('; '),
		i = arr.length;
	while(i--) {
		one = arr[i].split('='); {
			if(one[0] === escape(name)) {
				return unescape(one[1]);
			}
		}
	}
	return false;
}

function turnCookies(name) {
	var data = getCookie('DESU_Cookies'),
		arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > 13) {
		setCookie(arr[0], '', -10);
		arr.splice(0, 1);
	}
	setCookie('DESU_Cookies', arr.join('|'), storageLife);
}

function getStored(name) {
	if(sav.GM) {
		return GM_getValue(name);
	}
	if(sav.script) {
		return scriptStorage.getItem(name);
	}
	if(sav.local) {
		return localStorage.getItem(name);
	}
	return getCookie(name);
}

function setStored(name, value) {
	if(sav.GM) {
		GM_setValue(name, value);
	} else if(sav.script) {
		scriptStorage.setItem(name, value);
	} else if(sav.local) {
		localStorage.setItem(name, value);
	} else {
		setCookie(name, value, storageLife);
	}
}

function getStoredObj(name, def) {
	try {
		return eval(getStored(name)) || def;
	} catch(e) {
		return def;
	}
}

function saveSpells(val) {
	spellsList = val.split('\n');
	setStored('DESU_Spells_' + aib.dm, val);
	initSpells();
}

function fixGlobalCfg() {
	Cfg['forcap'] = aib.hana || aib.tire || aib.vomb || aib.ment || aib.tinyIb ? 2 : 1;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	fixGlobalCfg();
	setStored('DESU_Config_' + aib.dm, $uneval(defaultCfg));
}

function isValidCfg(data) {
	try {
		if(eval(data).version) {
			return true;
		}
	} catch(e) {}
	return false;
}

function readCfg() {
	var key,
		global = false,
		data = getStored('DESU_Config_' + aib.dm);
	if(sav.isGlobal && !isValidCfg(data)) {
		data = getStored('DESU_GlobalCfg');
		global = true;
	}
	if(isValidCfg(data)) {
		Cfg = eval(data);
		Cfg['version'] = defaultCfg['version'];
		for(key in defaultCfg) {
			if(Cfg[key] === undefined) {
				Cfg[key] = defaultCfg[key];
			}
		}
	} else {
		setDefaultCfg();
	}
	if(global) {
		fixGlobalCfg();
	}
	if(nav.Opera && nav.Opera < 11.1 && Cfg['sstyle'] === 0) {
		Cfg['sstyle'] = 1;
	}
	if(nav.Firefox < 6 && !nav.Chrome) {
		Cfg['pimgs'] = 0;
	}
	if(!aib.abu) {
		Cfg['noscrl'] = 0;
	}
	if(aib.nul) {
		Cfg['keynav'] = 0;
	}
	if(aib.fch) {
		Cfg['rarjpeg'] = 0;
	}
	if(!nav.Firefox) {
		Cfg['updfav'] = 0;
	}
	if(nav.Opera) {
		Cfg['ytitle'] = 0;
		Cfg['enupd'] = 0;
	}
	if(Cfg['svsage'] === 0) {
		Cfg['issage'] = 0;
	}
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
	lCode = Cfg['lang'];
	Stat = getStoredObj('DESU_Stat_' + aib.dm, {view: 0, op: 0, reply: 0});
	if(TNum) {
		Stat.view = +Stat.view + 1;
	}
	setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
	if(Cfg['ctime']) {
		parseTimePattern();
	}
	saveSpells(getStored('DESU_Spells_' + aib.dm) || '');
}

function saveCfg(name, val) {
	Cfg[name] = val;
	setStored('DESU_Config_' + aib.dm, $uneval(Cfg));
}

function toggleCfg(name) {
	saveCfg(name, Cfg[name] === 0 ? 1 : 0);
}

function getVisib(pNum) {
	var key = sav.cookie ? pByNum[pNum].Count : brd + pNum;
	return key in Visib ? Visib[key] : null;
}

function readPostsVisib() {
	var i, arr, data,
		currTime = (new Date()).getTime();
	if(sav.cookie) {
		if(TNum) {
			data = getStored('DESU_Posts_' + aib.dm + '_' + TNum);
			if(data) {
				i = data.length;
				while(i--) {
					Visib[i] = +data[i];
				}
			}
		}
	} else {
		data = getStored('DESU_Posts_' + aib.dm);
		if(data) {
			arr = data.split('-');
			i = arr.length;
			while((i -= 3) >= 0) {
				if(currTime < +arr[i + 2]) {
					Visib[arr[i]] = +arr[i + 1];
					Expires[arr[i]] = +arr[i + 2];
				}
			}
		}
	}
	readHiddenThreads();
	forEachPost(function(post) {
		var pNum = post.Num;
		post.Vis = getVisib(pNum);
		if(post.isOp) {
			if(hThrds[brd] && (
				sav.cookie && hThrds[brd].indexOf(pNum) >= 0
					|| !sav.cookie && hThrds[brd][pNum] !== undefined
			)) {
				setPostVisib(post, 0);
			} else if(post.Vis === 0) {
				Visib[brd + pNum] = null;
				post.Vis = null;
			}
		}
	});
}

function savePostsVisib() {
	var key,
		arr = [],
		id = 'DESU_Posts_' + aib.dm;
	if(sav.cookie) {
		if(TNum) {
			id += '_' + TNum;
			if(!getStored(id)) {
				turnCookies(id);
			}
			setStored(id, Visib.join(''));
		}
	} else {
		for(key in Visib) {
			if(!/^\d$/.test(Visib[key])) {
				break;
			}
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		}
		setStored(id, arr.join('-'));
	}
	toggleContent('Hid', true);
}

function readHiddenThreads() {
	hThrds = getStoredObj('DESU_Threads_' + aib.dm, {});
}

function saveHiddenThreads(txt) {
	setStored('DESU_Threads_' + aib.dm, txt);
}

function toggleHiddenThread(post, vis) {
	var i,
		b = brd,
		tNum = post.Num;
	if(sav.cookie) {
		if(!hThrds[b]) {
			hThrds[b] = [];
		}
		i = hThrds[b].indexOf(tNum);
		if(vis === 0 && i < 0) {
			hThrds[b].push(tNum);
		}
		if(vis === 1 && i >= 0) {
			hThrds[b].splice(i, 1);
		}
		if(escape(uneval(hThrds)).length > 4095) {
			hThrds[b].shift();
		}
	} else {
		if(!hThrds[b]) {
			hThrds[b] = {};
		}
		if(vis === 0) {
			hThrds[b][tNum] = post.dTitle;
		} else {
			delete hThrds[b][tNum];
			if(isEmptyObj(hThrds[b])) {
				delete hThrds[b];
			}
		}
	}
	saveHiddenThreads($uneval(hThrds));
}

function readFavorites() {
	Favor = getStoredObj('DESU_Favorites', {});
}

function saveFavorites(txt) {
	setStored('DESU_Favorites', txt);
	toggleContent('Fav', true);
}

function removeFavorites(h, b, tNum) {
	delete Favor[h][b][tNum];
	if(isEmptyObj(Favor[h][b])) {
		delete Favor[h][b];
	}
	if(isEmptyObj(Favor[h])) {
		delete Favor[h];
	}
	if(pByNum[tNum]) {
		$x('.//span[starts-with(@class,"DESU_btnFav")]', pByNum[tNum].Btns).className = 'DESU_btnFav';
	}
}

function toggleFavorites(post, btn) {
	var h = aib.host,
		b = brd,
		tNum = post.Num;
	if(!btn) {
		return;
	}
	readFavorites();
	if(Favor[h] && Favor[h][b] && Favor[h][b][tNum]) {
		removeFavorites(h, b, tNum);
		saveFavorites($uneval(Favor));
		return;
	}
	if(!Favor[h]) {
		Favor[h] = {};
	}
	if(!Favor[h][b]) {
		Favor[h][b] = {};
	}
	Favor[h][b][tNum] = {
		cnt: post.thr.pCount,
		txt: sav.cookie ? post.dTitle.substring(0, 25) : post.dTitle
	};
	if(sav.cookie && escape(uneval(Favor)).length > 4095) {
		$alert(Lng.cookiesLimit[lCode], 'CookieErr', false);
		delete Favor[h][b][tNum];
		return;
	}
	btn.className = 'DESU_btnFavSel';
	saveFavorites($uneval(Favor));
}

function markViewedPost(pNum) {
	var post = pByNum[pNum];
	if(post && (post.className).indexOf('DESU_viewed') < 0) {
		post.className += ' DESU_viewed';
	}
}

function readViewedPosts() {
	var arr, i;
	if(Cfg['navmrk'] !== 0 && sav.session) {
		arr = (sessionStorage.viewedPosts || '').split(',');
		for(i in arr) {
			markViewedPost(arr[i]);
		}
	}
}

function saveViewedPosts(pNum) {
	if(sav.session) {
		var arr = (sessionStorage.viewedPosts || '').split(',');
		arr.push(pNum);
		sessionStorage.viewedPosts = arr;
	}
}

/*==============================================================================
									MAIN PANEL
==============================================================================*/

function addPanel() {
	var imgLen = getImages(dForm).snapshotLength,
		pButton = function(id, click, href, over, out) {
			return $New('li', null, [
				$new('a', {
					'id': 'DESU_btn' + id,
					'class': 'DESU_aBtn',
					'title': Lng.panelBtn[id][lCode],
					'href': href ? href : '#'
				}, {
					'click': click,
					'mouseover': over,
					'mouseout': out
				})
			]);
		};

	$before(dForm, [
		$new('div', {'style': 'clear: both;'}, null),
		$New('div', {
			'id': 'DESU_panel',
			'lang': (Cfg['sstyle'] === 0 ? 'en' : Cfg['sstyle'] === 1 ? 'ru' : 'de')
		}, [
			$new('span', {
				'id': 'DESU_btnLogo',
				'style': 'cursor: pointer'}, {
				'click': function(e) {
					toggleCfg('showmp');
					scriptCSS();
				}
			}),
			$New('ul', {'id': 'DESU_panelBtns'}, [
				pButton('Settings', function(e) {
					$pd(e);
					toggleContent('Cfg', false);
				}, null, null, null),
				pButton('Hidden', function(e) {
					$pd(e);
					toggleContent('Hid', false);
				}, null, null, null),
				pButton('Favor', function(e) {
					$pd(e);
					toggleContent('Fav', false);
				}, null, null, null),
				pButton('Refresh', function(e) {
					$pd(e);
					window.location.reload();
				}, null, function() {
					if(!TNum) {
						selectAjaxPages();
					}
				}, removeSelMenu),
				pButton('GoBack', null, '//' + aib.host + getPageUrl(pageNum - 1), null, null),
				$if(!TNum, pButton('GoNext', null, '//' + aib.host + getPageUrl(pageNum + 1), null, null)),
				pButton('GoUp', function(e) {
					$pd(e);
					window.scrollTo(0, 0);
				}, null, null, null),
				pButton('GoDown', function(e) {
					$pd(e);
					window.scrollTo(0, doc.body.scrollHeight || doc.body.offsetHeight);
				}, null, null, null),
				$if(
					!TNum && (pr.on || oeForm),
					pButton('NewThr', toggleMainReply, null, null, null)
				),
				$if(imgLen > 0, pButton('ExpImg', function(e) {
					$pd(e);
					Cfg['expimg'] = 1;
					isExpImg = !isExpImg;
					forEachPost(function(post) {
						expandAllPostImg(post, isExpImg);
					});
				}, null, null, null)),
				$if(pr.file || oeForm, pButton('MaskImg', function(e) {
					$pd(e);
					toggleCfg('mask');
					scriptCSS();
				}, null, null, null)),
				$if(TNum && Cfg['updthr'] !== 3, pButton('UpdOn', function(e) {
					$pd(e);
					if(ajaxInterval) {
						endPostsUpdate();
					} else {
						this.id = 'DESU_btnUpdOn';
						initThreadsUpdater();
					}
				}, null, null, null)),
				$if(aib.nul, pButton('Catalog', null, '//0chan.ru/' + brd + '/catalog.html', null, null))
			]),
			$if(TNum, $New('div', {'id': 'DESU_panelInfo'}, [
				$new('span', {
					'title': Lng.panelBtn.counter[lCode],
					'text': Posts.length + '/' + imgLen
				}, null)
			]))
		]),
		$new('div', {
			'class': 'DESU_content',
			'lang': (Cfg['sstyle'] === 0 ? 'en' : Cfg['sstyle'] === 1 ? 'ru' : 'de')
		}, null),
		$new('div', {'id': 'DESU_alertBox'}, null),
		$new('hr', {'style': 'clear: both;'}, null)
	]);
}

function toggleContent(name, isUpd) {
	if(liteMode) {
		return;
	}
	var el = $c('DESU_content', doc),
		id = 'DESU_content' + name;
	if(!isUpd || el.id === id) {
		if(el.childElementCount && Cfg['animp'] !== 0 && nav.Anim) {
			nav.aEvent(el, function() {
				showContent(el, id, name, isUpd);
			});
			el.className = 'DESU_content DESU_cfgClose';
		} else {
			showContent(el, id, name, isUpd);
		}
	}
}

function showContent(el, id, name, isUpd) {
	el.innerHTML = '';
	if(!isUpd && el.id === id) {
		el.id = '';
		return;
	}
	el.id = id;
	if(Cfg['attach'] === 0) {
		el.appendChild($new('hr', {'style': 'clear: both;'}, null));
	}
	if(name === 'Cfg') {
		addSettings();
	} else {
		el.appendChild($add('<table><tbody align="left"></tbody></table>'));
		if(Cfg['attach'] !== 0) {
			$t('table', el).style.backgroundColor = getStyle(doc.body, 'background-color');
		}
		if(name === 'Hid') {
			readHiddenThreads();
			addHiddenTable();
		}
		if(name === 'Fav') {
			readFavorites();
			addFavoritesTable();
		}
	}
	if(Cfg['animp'] !== 0 && nav.Anim) {
		el.className = 'DESU_content DESU_cfgOpen';
	}
}


/*==============================================================================
								"SETTINGS" WINDOW
==============================================================================*/

function addSettings() {
	var lBox = function(name, fn, id) {
		var el = $new('input', {
			'type': 'checkbox'}, {
			'click': function() {
				toggleCfg(name);
				if(fn) {
					fn();
				}
			}
		});
		el.checked = Cfg[name] !== 0;
		if(id !== '') {
			el.id = id;
		}
		return $New('label', null, [el, $txt(' ' + Lng.cfg[name][lCode])]);
	},

	divBox = function(name, fn) {
		return $New('div', null, [lBox(name, fn, '')]);
	},

	inpTxt = function(name, size, fn) {
		return $new('input', {
			'type': 'text',
			'id': 'DESU_' + name,
			'size': size,
			'value': Cfg[name]}, {
			'keyup': function() {
				saveCfg(name, $id('DESU_' + name).value.replace(/\|/g, ''));
				if(fn) {
					fn();
				}
			}
		})
	},

	optSel = function(name, fn) {
		for(var i = 0, x = Lng.cfg[name], len = x.sel[lCode].length, el, opt = []; i < len; i++) {
			opt[i] = '<option value="' + i + '">' + x.sel[lCode][i] + '</option>';
		}
		el = $event($add('<select id="' + name + '_sel">' + opt.join('') + '</select>'), {
			'change': (fn ? fn : function() {
				saveCfg(name, this.selectedIndex);
			})
		});
		el.selectedIndex = Cfg[name];
		return $New('label', null, [el, $txt(' ' + x.txt[lCode])]);
	},

	cfgTab = function(id, el) {
		return $New('div', {'class': aib.pClass + ' DESU_cfgTabBack'}, [
			$new('div', {
				'class': 'DESU_cfgTab',
				'text': Lng.cfgTab[id][lCode]}, {
				'click': function() {
					openTab(this, el);
				}
			})
		])
	},

	openTab = function(tab, el) {
		if(tab.className == 'DESU_cfgTab_sel') {
			return;
		}
		var oldEl = $c('DESU_cfgBody', doc);
		if(oldEl) {
			oldEl.parentNode.replaceChild(el, oldEl);
			$c('DESU_cfgTab_sel', doc).className = 'DESU_cfgTab';
		} else {
			$after($id('DESU_cfgBar'), el);
		}
		if(Cfg['keynav'] !== 0) {
			keyNavTrigger(el);
		}
		tab.className = 'DESU_cfgTab_sel';
		if(el === cfgFilters) {
			spellsList = getStored('DESU_Spells_' + aib.dm).split('\n');
			initSpells();
			$id('DESU_spellEdit').value = spellsList.join('\n');
		}
	},

	cfgFilters = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgFilters'
	}, [
		$New('div', null, [
			$New('span', {'id': 'DESU_spellPanel'}, [
				$new('a', {
					'text': Lng.add[lCode],
					'href': '#',
					'class': 'DESU_aBtn'}, {
					'click': $pd,
					'mouseover': selectSpell,
					'mouseout': removeSelMenu
				}),
				$new('a', {
					'text': Lng.apply[lCode],
					'href': '#',
					'class': 'DESU_aBtn'}, {
					'click': function(e) {
						$pd(e);
						applySpells('');
					}
				}),
				$new('a', {
					'text': Lng.clear[lCode],
					'href': '#',
					'class': 'DESU_aBtn'}, {
					'click': function(e) {
						$pd(e);
						$id('DESU_spellEdit').value = '';
						applySpells('');
					}
				}),
				$new('a', {
					'text': '?',
					'target': '_blank',
					'href': '//www.freedollchan.org/scripts/spells',
					'class': 'DESU_aBtn'
				}, null)
			]),
			lBox('spells', toggleSpells, 'DESU_spellChk'),
			$new('textarea', {
				'id': 'DESU_spellEdit',
				'rows': 7,
				'cols': 49
			}, null)
		]),
		$New('div', null, [
			lBox('awipe', null, ''),
			$btn('>', Lng.showMore[lCode], function() {
				$disp($id('DESU_cfgWipe'));
			})
		]),
		$New('div', {
			'id': 'DESU_cfgWipe',
			'style': 'display: none; padding-left: 25px;'
		}, [
			divBox('samel', null),
			divBox('samew', null),
			divBox('longp', null),
			divBox('longw', null),
			divBox('specs', null),
			divBox('caps', null),
			divBox('nums', null)
		]),
		divBox('filthr', null),
		divBox('menuhd', null),
		divBox('viewhd', null),
		$New('div', null, [
			optSel('delhd', function() {
				processHidden(this.selectedIndex, Cfg['delhd']);
			})
		])
	]),

	cfgPosts = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgPosts'
	}, [
		$New('div', null, [optSel('updthr', null)]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [optSel('updint', null)]),
			$if(nav.Firefox, divBox('updfav', null))
		]),
		$New('div', null, [optSel('expost', null)]),
		$New('div', null, [optSel('expimg', null)]),
		$if(nav.Firefox >= 6 || nav.Chrome, divBox('pimgs', null)),
		$if(!aib.fch && (nav.Firefox >= 6 || nav.Chrome), $New('div', {'style': 'padding-left: 25px;'}, [
			lBox('rarjpeg', null, '')
		])),
		divBox('imgsrc', null),
		divBox('ospoil', scriptCSS),
		divBox('noname', scriptCSS),
		$if(aib.abu, lBox('noscrl', scriptCSS, '')),
		$if(!aib.nul, $New('div', null, [
			lBox('keynav', null, ''),
			$new('a', {
				'text': '?',
				'href': '#',
				'class': 'DESU_aBtn'}, {
				'click': function(e) {
					$pd(e);
					$alert(Lng.keyNavHelp[lCode], 'KNavHlp', false);
				}
			})
		])),
		$New('div', null, [lBox('ctime', toggleTimeSettings, 'DESU_ctime')]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('ctmofs', 3, null),
				$new('span', {text: Lng.cfg.ctmofs[lCode]}, null)
			]),
			$New('div', null, [
				inpTxt('ctmpat', 30, null),
				$txt(' '),
				$new('a', {
					'text': Lng.cfg.ctmpat[lCode],
					'href': '#',
					'class': 'DESU_aBtn'}, {
					'click': function(e) {
						$pd(e);
						$alert('"s" - second (one digit),\n"i" - minute (one digit),\n"h" - hour (one digit),\n"d" - day (one digit),\n"n" - month (one digit),\n"m" - month (string),\n"y" - year (one digit),\n"-" - any symbol\n"+" - any symbol except digits\n"?" - previous char may not be\n\nExamples:\n0chan.ru: "++++yyyy+m+dd+hh+ii+ss"\niichan.ru, 2ch.so: "++++dd+m+yyyy+hh+ii+ss"\ndobrochan.ru: "dd+m+?+?+?+?+?+yyyy+++++++hh+ii-?s?s?"\n410chan.org: "dd+nn+yyyy+++++++hh+ii+ss"\n4chan.org: "nn+dd+yy+++++hh+ii-?s?s?"\n4chon.net: "nn+dd+yy+++++++hh+ii+ss"\nkrautchan.net: "yyyy+nn+dd+hh+ii+ss+--?-?-?-?-?"', 'TRepHlp', false);
					}
				})
			])
		])
	]),

	cfgLinks = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgLinks'
	}, [
		$New('div', null, [optSel('navig', null)]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				inpTxt('nashow', 6, null),
				$txt(Lng.cfg.nashow[lCode])
			]),
			$New('div', null, [
				inpTxt('navdel', 6, null),
				$txt(Lng.cfg.navdel[lCode])
			]),
			divBox('navmrk', null),
			divBox('navhid', null),
			divBox('navdis', null)
		]),
		divBox('insnum', null),
		divBox('mp3', null),
		divBox('addimg', null),
		$New('div', null, [optSel('ytube', null)]),
		$New('div', {'style': 'padding-left: 25px;'}, [
			$New('div', null, [
				optSel('yptype', null),
				inpTxt('ywidth', 6, null),
				$txt('×'),
				inpTxt('yheigh', 6, null),
				$txt(' '),
				lBox('yhdvid', null, '')
			]),
			$if(!nav.Opera, lBox('ytitle', null, ''))
		])
	]),

	cfgForm = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgForm'
	}, [
		$if(pr.on, $New('div', null, [optSel('pform', null)])),
		$if(pr.on, divBox('tform', function() {
			if(!TNum) {
				$id('DESU_parea').style.display = Cfg['tform'] ? 'none' : '';
			}
		})),
		divBox('addfav', null),
		divBox('verify', null),
		$if(nav.h5Rep, $New('div', {'style': 'padding-left: 25px;'}, [
			divBox('sImgs', null),
			divBox('rExif', null)
		])),
		$if(pr.mail, $New('div', null, [
			lBox('sagebt', null, ''),
			lBox('svsage', null, '')
		])),
		$New('div', null, [optSel('forcap', null)]),
		$if(pr.on, $New('div', null, [
			optSel('txtbtn', function() {
				saveCfg('txtbtn', this.selectedIndex);
				addTextPanel();
				scriptCSS();
			}),
			lBox('txtpos', null, '')
		])),
		$if(pr.name, $New('div', null, [
			inpTxt('namval', 20, setUserName),
			lBox('name', setUserName, 'DESU_fixNameChk')
		])),
		$if(pr.passw, $New('div', null, [
			inpTxt('pasval', 20, setUserPassw),
			lBox('passw', setUserPassw, 'DESU_fixPassChk')
		])),
		$if(pr.txta, $New('div', null, [
			inpTxt('sigval', 20, null),
			lBox('sign', null, '')
		])),
		$New('div', null, [
			$if(pr.on || oeForm, $txt(Lng.dontShow[lCode])),
			lBox('norule', scriptCSS, ''),
			$if(pr.gothr, lBox('nogoto', function() {
				$disp(pr.gothr);
			}, '')),
			$if(pr.passw, lBox('nopass', function() {
				$disp(pr.passw.parentNode.parentNode);
			}, ''))
		])
	]),

	cfgCommon = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgCommon'
	}, [
		$New('div', null, [
			optSel('sstyle', function() {
				var sI = this.selectedIndex;
				saveCfg('sstyle', sI);
				$id('DESU_panel').lang = $c('DESU_content', doc).lang = (sI === 0 ? 'en' : sI === 1 ? 'ru' : 'de');
			})
		]),
		divBox('attach', function() {
			toggleContent('Cfg', false);
			scriptCSS();
		}),
		divBox('icount', scriptCSS),
		divBox('rtitle', null),
		divBox('animp', null),
		divBox('aclose', null),
		$if(!nav.Opera, $New('div', null, [
			divBox('enupd', null),
			$New('div', {'id': 'DESU_updCont', 'style': 'padding: 2px 0 10px 25px;'}, [
				optSel('supdint', function() {
					saveCfg('supdint', this.selectedIndex);
				}),
				divBox('betaupd', null),
				$btn(Lng.checkNow[lCode], '', function() {
					var el = $id('DESU_updRes');
					el.innerHTML = '<span class="DESU_wait">' + Lng.checking[lCode] + '</div>';
					checkForUpdates(true, function(html) {
						el.innerHTML = html;
					});
				})
			]),
			$new('div', {'id': 'DESU_updRes', 'style': 'font-size: 1.1em; text-align: center'}, null)
		]))
	]),

	cfgInfo = $New('div', {
		'class': 'DESU_cfgBody',
		'id': 'DESU_cfgInfo'
	}, [
		$add('<div style="padding-left: 10px;"><div style="display: inline-block; vertical-align: top; width: 170px;"><b>' + Lng.version[lCode] + Cfg['version'] + '</b><br><br>' + Lng.storage[lCode] + (sav.GM ? 'Mozilla config' : sav.script ? 'Opera ScriptStorage' : sav.local ? 'Local Storage' : 'Cookies') + '<br>' + Lng.thrViewed[lCode] + Stat.view + '<br>' + Lng.thrCreated[lCode] + Stat.op + '<br>' + Lng.pstSended[lCode] + Stat.reply + '</div><div style="display: inline-block; vertical-align: top; padding-left: 17px; border-left: 1px solid grey;">' + timeLog.split('\n').join('<br>') + '<br>' + Lng.total[lCode] + endTime + 'ms</div><div style="text-align: center;"><a href="//www.freedollchan.org/scripts/" target="_blank">http://www.freedollchan.org/scripts/</a></div></div>')
	]);

	$append($id('DESU_contentCfg'), [
		$New('div', {
			'class': aib.pClass,
			'id': 'DESU_cfgWindow'
		}, [
			$new('div', {
				'id': 'DESU_cfgHead',
				'text': 'Dollchan Extension Tools'
			}, null),
			$New('div', {'id': 'DESU_cfgBar'}, [
				cfgTab('Filters', cfgFilters),
				cfgTab('Posts', cfgPosts),
				cfgTab('Links', cfgLinks),
				cfgTab('Form', cfgForm),
				cfgTab('Common', cfgCommon),
				cfgTab('Info', cfgInfo)
			]),
			$New('div', {'id': 'DESU_cfgBtns'}, [
				$New('div', {'style': 'float: right;'}, [
					optSel('lang', function() {
						saveCfg('lang', this.selectedIndex);
						window.location.reload();
					}),
					$if(sav.isGlobal, $btn(Lng.load[lCode], Lng.loadGlobal[lCode], function() {
						if(isValidCfg(getStored('DESU_GlobalCfg'))) {
							setStored('DESU_Config_' + aib.dm, '');
							window.location.reload();
						} else {
							$alert(Lng.noGlobalCfg[lCode], 'ErrNoGCfg', false);
						}
					})),
					$if(sav.isGlobal, $btn(Lng.save[lCode], Lng.saveGlobal[lCode], function() {
						setStored('DESU_GlobalCfg', $uneval(Cfg));
						toggleContent('Cfg', true);
					})),
					$btn(Lng.edit[lCode], Lng.editInTxt[lCode], function() {
						$disp($attr($id('DESU_cfgEdit'), {
							'value': getStored('DESU_Config_' + aib.dm)
						}).parentNode);
					}),
					$btn(Lng.reset[lCode], Lng.resetCfg[lCode], function() {
						setDefaultCfg();
						setStored('DESU_Stat_' + aib.dm, '');
						setStored('DESU_Favorites', '');
						setStored('DESU_Threads_' + aib.dm, '');
						saveSpells('');
						window.location.reload();
					})
				]),
				$new('br', {'style': 'clear: both;'}, null),
				$New('div', {'style': 'display: none;'}, [
					$new('textarea', {
						'id': 'DESU_cfgEdit',
						'rows': 10,
						'cols': 56,
						'value': ''
					}, null),
					$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
						setStored('DESU_Config_' + aib.dm, $id('DESU_cfgEdit').value.trim());
						window.location.reload();
					})
				])
			])
		])
	]);
	openTab($c('DESU_cfgTab', doc), cfgFilters);
}


/*==============================================================================
									"HIDDEN" WINDOW
==============================================================================*/

function addHiddenTable() {
	var pp, cln, b, tNum, url,
		clones = [],
		tcnt = 0,
		pcnt = 0,
		table = $t('tbody', $id('DESU_contentHid'));
	forEachPost(function(post) {
		if(post.Vis !== 0) {
			return;
		}
		pp = !post.isOp;
		cln = $attr(($id('DESU_hidThr_' + post.Num) || post).cloneNode(true), {'id': ''});
		clones.push(cln);
		cln.style.display = '';
		cln.pst = post;
		cln.vis = 0;
		$event(pp ? $c('DESU_btnUnhide', doc) : $x('.//a', cln), {
			'click': function(el) {
				return function(e) {
					$pd(e);
					el.vis = el.vis === 0 ? 1 : 0;
					if(pp) {
						togglePost(el, el.vis);
					} else {
						el.nextElementSibling.style.display = el.vis === 1 ? '' : 'none';
					}
				}
			}(cln)
		});
		if(Cfg['attach'] === 0) {
			$event(aib.getRef(cln) || $x('.//a', cln), {
				'mouseover': function(el) {
					return function() {
						if(el.vis === 0) {
							if(pp) {
								togglePost(el, 1);
							} else {
								el.nextElementSibling.style.display = '';
							}
						}
					}
				}(cln),
				'mouseout': function(el) {
					return function() {
						if(el.vis === 0) {
							if(pp) {
								togglePost(el, 0);
							} else {
								el.nextElementSibling.style.display = 'none';
							}
						}
					}
				}(cln)
			});
		}
		$append(table, [
			$if(!pp && tcnt++ === 0 || pp && pcnt++ === 0, $New('tr', null, [
				$add('<b>' + (
					pp ? Lng.hiddenPosts[lCode] : Lng.hiddenThrds[lCode]
				) + Lng.onPage[lCode] + ':</b>')
			])),
			$New('tr', null, [
				cln,
				$if(!pp, $attr(post.cloneNode(true), {
					'style': 'display: none; padding-left: 15px; '
						+ 'overflow: hidden; border: 1px solid grey;'
				}))
			])
		]);
		if(!pp) {
			togglePost(cln.nextElementSibling, 1);
		}
	});
	if(pcnt + tcnt === 0) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noHidOnPage[lCode] + '</b>'));
	} else {
		$append(table.insertRow(-1), [
			$btn(Lng.expandAll[lCode], '', function() {
				var i;
				if(this.value === Lng.expandAll[lCode]) {
					this.value = Lng.undo[lCode];
					for(i = 0; cln = clones[i++];) {
						setPostVisib(cln.pst, 1);
					}
				} else {
					this.value = Lng.expandAll[lCode];
					for(i = 0; cln = clones[i++];) {
						setPostVisib(cln.pst, cln.vis);
					}
				}
			}),
			$btn(Lng.save[lCode], '', function() {
				var i;
				for(i = 0; cln = clones[i++];) {
					if(cln.vis !== 0) {
						setPostVisib(cln.pst, 1);
					}
				}
				savePostsVisib();
			})
		]);
	}
	$append(table, [
		$New('tr', null, [
			$new('hr', null, null),
			$add('<b>' + (
				isEmptyObj(hThrds) ? Lng.noHidThrds[lCode] : Lng.hiddenThrds[lCode]
			) + '</b>')
		])
	]);
	if(!isEmptyObj(hThrds)) {
		for(b in hThrds) {
			$append(table, [
				$New('tr', {
					'class': 'DESU_hidTHead',
					'id': 'DESU_hidTHead_' + b
				}, [
					$new('input', {
						'type': 'checkbox'}, {
						'click': function() {
							var inp = this;
							$each($X(
								'.//tr[contains(@id,"_' + inp.parentNode.id.substr(14) + '|")]/div/input',
								table
							), function(el) {
								el.checked = inp.checked;
							});
						}
					}),
					$add('<b>' + b + '</b>')
				])
			]);
			for(tNum in hThrds[b]) {
				if(sav.cookie) {
					tNum = hThrds[b][tNum];
				}
				url = getThrdUrl(aib.host, b, tNum);
				$append(table, [
					$New('tr', {
						'class': 'DESU_hidTData',
						'id': 'DESU_hidTData_' + b + '|' + tNum
					}, [
						$New('div', {'class': aib.pClass}, [
							$new('input', {'type': 'checkbox'}, null),
							$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
							$if(!sav.cookie, $txt(' - ' + hThrds[b][tNum]))
						])
					])
				]);
			}
		}
	}
	$append(table, [
		$New('tr', null, [
			$btn(Lng.edit[lCode], Lng.editInTxt[lCode], function() {
				$disp($id('DESU_hidTEdit').parentNode);
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each($X('.//tr[@class="DESU_hidTData"]', table), function(el) {
					var i,
						arr = el.id.substr(14).split('|'),
						b = arr[0],
						tNum = arr[1];
					if($t('input', el).checked) {
						if(pByNum[tNum]) {
							setPostVisib(pByNum[tNum], 1);
						} else if(sav.cookie) {
							i = hThrds[b].indexOf(tNum);
							if(i >= 0) {
								hThrds[b].splice(i, 1);
							}
						} else {
							Visib[b + tNum] = 1;
							delete hThrds[b][tNum];
						}
						if(isEmptyObj(hThrds[b])) {
							delete hThrds[b];
						}
					}
				});
				setStored('DESU_Threads_' + aib.dm, $uneval(hThrds));
				savePostsVisib();
			})
		]),
		$New('tr', {'style': 'display: none;'}, [
			$new('textarea', {
				'id': 'DESU_hidTEdit',
				'rows': 9,
				'cols': 70,
				'value': $uneval(hThrds)
			}, null),
			$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
				saveHiddenThreads($id('DESU_hidTEdit').value);
			})
		])
	]);
	eventRefLink(table);
}


/*==============================================================================
								"FAVORITES" WINDOW
==============================================================================*/

function addFavoritesTable() {
	var h, b, tNum, url, fav, list,
		table = $t('tbody', $id('DESU_contentFav'));
	for(h in Favor) {
		for(b in Favor[h]) {
			$append(table, [
				$New('tr', {
					'class': 'DESU_favHead',
					'id': 'DESU_favHead_' + h + '|' + b
				}, [
					$new('input', {
						'type': 'checkbox'}, {
						'click': function() {
							var inp = this;
							$each($X(
								'.//tr[contains(@id,"_' + inp.parentNode.id.substr(13) + '|")]/div/input',
								table
							), function(el) {
								el.checked = inp.checked;
							});
						}
					}),
					$add('<a href="//' + h + '/' + b + '" target="_blank">' + h + '/' + b + '</a>')
				])
			]);
			for(tNum in Favor[h][b]) {
				url = getThrdUrl(h, b, tNum);
				fav = Favor[h][b][tNum];
				$append(table, [
					$New('tr', {
						'class': 'DESU_favData',
						'id': 'DESU_favData_' + h + '|' + b + '|' + tNum
					}, [
						$New('div', {'class': aib.pClass}, [
							$new('input', {'type': 'checkbox'}, null),
							$new('span', {
								'class': 'DESU_btnExpthr'}, {
								'click': loadFavorThread
							}),
							$add('<a href="' + url + '" target="_blank">№' + tNum + '</a>'),
							$txt(' - ' + fav.txt),
							$add('<span class="DESU_favPCount">[<span>' + fav.cnt + '</span>]</span>')
						]),
						$new('div', {
							'id': tNum,
							'class': 'DESU_favThr',
							'style': 'display: none;'
						}, null)
					])
				]);
			}
		}
	}
	if(!table.firstChild) {
		table.insertRow(-1).appendChild($add('<b>' + Lng.noFavorites[lCode] + '</b>'));
	}
	list = $X('.//tr[@class="DESU_favData"]', table);
	$append(table, [
		$New('tr', null, [
			$new('hr', null, null),
			$btn(Lng.edit[lCode], Lng.editInTxt[lCode], function() {
				$disp($id('DESU_favEdit').parentNode);
			}),
			$btn(Lng.info[lCode], Lng.infoCount[lCode], function() {
				$each(list, function(el) {
					var c,
						arr = el.id.substr(13).split('|'),
						cnt = 0;
					if(aib.host === arr[0]) {
						c = $t('span', $c('DESU_favPCount', el));
						$attr(c, {
							'class': 'DESU_wait',
							'text': ''
						});
						ajaxGetPosts(null, arr[1], arr[2], function(dc, post, j) {
							cnt++;
						}, function(err) {
							$attr(c, {
								'class': '',
								'text': err || cnt
							});
							if(!err) {
								Favor[arr[0]][arr[1]][arr[2]].cnt = cnt;
								setStored('DESU_Favorites', $uneval(Favor));
							}
						});
					}
				});
			}),
			$btn(Lng.clear[lCode], Lng.clrDeleted[lCode], function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					ajaxGetPosts(
						getThrdUrl(arr[0], arr[1], arr[2]), null, null, null,
						function(err) {
							if(err) {
								removeFavorites(arr[0], arr[1], arr[2]);
								saveFavorites($uneval(Favor));
							}
						}
					);
				});
			}),
			$btn(Lng.remove[lCode], Lng.clrSelected[lCode], function() {
				$each(list, function(el) {
					var arr = el.id.substr(13).split('|');
					if($t('input', el).checked) {
						removeFavorites(arr[0], arr[1], arr[2]);
					}
				});
				saveFavorites($uneval(Favor));
			})
		]),
		$New('tr', {'style': 'display: none;'}, [
			$new('textarea', {
				'id': 'DESU_favEdit',
				'rows': 9,
				'cols': 70,
				'value': $uneval(Favor)
			}, null),
			$btn(Lng.save[lCode], Lng.saveChanges[lCode], function() {
				saveFavorites($id('DESU_favEdit').value);
			})
		])
	]);
}


/*==============================================================================
								POPUP ALERT MESSAGES
==============================================================================*/

function showAlert(el) {
	if(Cfg['animp'] === 0) {
		return;
	}
	if(nav.Anim) {
		el.oclassName = el.className;
		el.className += ' DESU_aOpen';
		return;
	}
	var i = 0,
		showing = setInterval(function() {
			if(!el || i++ > 8) {
				clearInterval(showing);
				return;
			}
			var s = el.style;
			s.opacity = i/10;
			s.paddingTop = (parseInt(s.paddingTop, 10) + 1) + 'px';
			s.paddingBottom = (parseInt(s.paddingBottom, 10) + 1) + 'px';
		}, 30);
	el.style.paddingTop = el.style.paddingBottom = '0px';
	el.style.opacity = 0;
}

function closeAlert(el) {
	if(!el) {
		return;
	}
	if(Cfg['animp'] === 0) {
		$del(el);
		return;
	}
	if(nav.Anim) {
		nav.aEvent(el, function() {
			$del(el);
		});
		el.className = el.oclassName + ' DESU_aClose';
		return;
	}
	var i = 8,
		h = el.clientHeight - 18,
		closing = setInterval(function() {
			if(!el || i-- < 0) {
				clearInterval(closing);
				$del(el);
				return;
			}
			var s = el.style,
				hh = parseInt(s.height, 10) - h/10;
			s.opacity = i/10;
			s.paddingTop = (parseInt(s.paddingTop, 10) - 1) + 'px';
			s.paddingBottom = (parseInt(s.paddingBottom, 10) - 1) + 'px';
			s.height = (hh < 0 ? 0 : hh) + 'px';
		}, 30);
	el.style.height = h + 'px';
}

function blinkAlert(el) {
	if(Cfg['animp'] === 0) {
		return;
	}
	if(nav.Anim) {
		nav.aEvent(el, function() {
			el.className = el.oclassName;
		});
		el.className = el.oclassName + ' DESU_aBlink';
		return;
	}
	var i = 6,
		blinking = setInterval(function() {
			el.style.opacity = el.style.opacity !== '0' ? 0 : 0.9;
			if(i-- < 0) {
				clearInterval(blinking);
			}
		}, 80);
	el.style.opacity = 0.9;
}

function $alert(txt, id, wait) {
	var node,
		el = $id('DESU_alert' + id),
		cMsg = 'DESU_alertMsg' + (wait ? ' DESU_wait' : ''),
		tBtn = wait ? '' : '× ';
	if(el) {
		node = $t('div', el);
		node.innerHTML = txt.trim();
		node.className = cMsg;
		$t('span', el).textContent = tBtn;
		blinkAlert(el);
		return;
	}
	el = $New('div', {
		'class': aib.pClass,
		'id': 'DESU_alert' + id
	}, [
		$new('span', {
			'class': 'DESU_alertBtn',
			'text': tBtn}, {
			'click': function(e) {
				closeAlert(this.parentNode);
			}
		}),
		$add('<div class="' + cMsg + '">' + txt.trim() + '</div>')
	]);
	showAlert($id('DESU_alertBox').appendChild(el));
	if(Cfg['aclose'] !== 0 && !wait) {
		setTimeout(function() {
			closeAlert(el);
		}, 4e3);
	}
}


/*==============================================================================
								DROPDOWN SELECT MENUS
==============================================================================*/

function removeSelMenu(e) {
	if(!$xb('ancestor-or-self::div[@id="DESU_select"]', e.relatedTarget)) {
		$del($id('DESU_select'));
	}
}

function addSelMenu(el, fPanel, html) {
	var y, pos,
		pst = getPost(el);
	if(Cfg['attach'] !== 0 && fPanel) {
		pos = 'fixed';
		y = el.id === 'DESU_btnRefresh'
			? 'bottom: 25'
			: 'top: ' + (el.getBoundingClientRect().top + el.offsetHeight);
	} else {
		pos = 'absolute';
		y = 'top: ' + ($offset(el).top + el.offsetHeight);
	}
	doc.body.appendChild($event($add(
		'<div class="' + aib.pClass + '" id="DESU_select" style="position: ' + pos + '; ' + (
			el.className === 'DESU_btnSrc'
				? 'left: ' + $offset(el).left
				: 'right: ' + (doc.body.clientWidth - $offset(el).left - el.offsetWidth)
		) + 'px; ' + y + 'px;">' + html + '</div>'
	), {
		'mouseout': removeSelMenu,
		'mouseover': function() {
			if(pst && pst.node) {
				markPviewToDel(pst.node, false);
			}
		}
	}));
	return $X('.//div[@id="DESU_select"]//a', doc);
}

function selectSpell(e) {
	$each(addSelMenu(
		e.target, true,
		'<div style="display: inline-block; border-right: 1px solid grey;"><a href="#">'
			+ ('#b/,#b/itt,#exp ,#exph ,#img ,#imgn ,#name ,#noimg,#notxt,#num ,').split(',')
			.join('</a><a href="#">') + '</a></div><div style="display: inline-block;"><a href="#">'
			+ ('#op,#outrep,#rep ,#sage,#skip ,#theme ,#tmax ,#trip,#video ')
			.split(',').join('</a><a href="#">') + '</a></div>'
	), function(a) {
		$event(a, {
			'click': function(e) {
				var exp = this.textContent;
				$pd(e);
				if(exp === '#b/') {
					exp = '#' + brd + '/ ';
				}
				if(exp === '#b/itt') {
					if(TNum) {
						exp = '#' + brd + '/' + TNum + ' ';
					} else {
						return;
					}
				}
				insertInto($id('DESU_spellEdit'), exp);
			}
		});
	});
}

function selectPostHider(post) {
	if(Cfg['menuhd'] === 0 || Cfg['filthr'] === 0 && post.isOp) {
		return;
	}
	var a = addSelMenu(
		post.Btns.firstChild, false,
		'<a href="#">' + Lng.selHiderMenu[lCode].join('</a><a href="#">') + '</a>'
	);
	$event(a.snapshotItem(0), {
		'click': function(e) {
			$pd(e);
			applySpells(quotetxt);
		},
		'mouseover': function() {
			quotetxt = txtSelection().trim();
		}
	});
	$event(a.snapshotItem(1), {
		'click': function(e) {
			$pd(e);
			applySpells(
				post.Img.snapshotLength === 0
					? '#noimg'
					: '#img =' + getImgWeight(post) + '@' + getImgSize(post).join('x')
			)
		}
	});
	$event(a.snapshotItem(2), {
		'click': function(e) {
			$pd(e);
			hideBySameText(post);
		}
	});
}

function selectExpandThread(post) {
	$each(addSelMenu(
		$x('span[3]', post.Btns), false,
		'<a href="#">' + Lng.selExpandThrd[lCode].join('</a><a href="#">') + '</a>'
	), function(a) {
		$event(a, {
			'click': function(e) {
				$pd(e);
				loadThread(post, parseInt(this.textContent, 10), null);
			}
		});
	});
}

function selectAjaxPages() {
	$each(addSelMenu(
		$id('DESU_btnRefresh'), true,
		'<a href="#">' + Lng.selAjaxPages[lCode].join('</a><a href="#">') + '</a>'
	), function(a, i) {
		$event(a, {
			'click': function(e) {
				$pd(e);
				loadPages(i + 1);
			}
		});
	});
}

function selectImgSearch(btn, href) {
	addSelMenu(
		btn, false,
		'<a class="DESU_srcIqdb" href="//iqdb.org/?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'IQDB</a>'
			+ '<a class="DESU_srcTineye" href="//tineye.com/search/?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'TinEye</a>'
			+ '<a class="DESU_srcGoogle" href="//google.ru/searchbyimage?image_url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'Google</a>'
			+ '<a class="DESU_srcSaucenao" href="//saucenao.com/search.php?url=' + href
			+ '" target="_blank">' + Lng.search[lCode] + 'SauceNAO</a>'
	);
}


/*==============================================================================
								KEYBOARD NAVIGATION
==============================================================================*/

function keyNavTrigger(node) {
	$each($X('.//input[@type="text" or @type="password"]|.//textarea', node), function(el) {
		el.onfocus = function() {
			isKeyNav = false;
		};
		el.onblur = function() {
			isKeyNav = true;
		};
	});
}

function initKeyNavig() {
	var pIndex,
		tIndex = 0,
		scrScroll = false,
		pScroll = true,
		tScroll = true,
		findCurrPost = function(posts) {
			for(var i = 0, scrolled = window.pageYOffset; i < posts.length; i++) {
				if($offset(posts[i]).top > scrolled) {
					return i - 1;
				}
			}
		},
		scrollToPost = function(posts, idx, dir, scroll, toTop) {
			var post,
				mIdx = idx;
			while(posts[mIdx].Vis === 0 || posts[mIdx].thr.Vis === 0) {
				mIdx += dir;
			}
			post = posts[mIdx];
			if(mIdx !== idx || scroll) {
				window.scrollTo(
					0, toTop
						? $offset(post).top
						: $offset(post).top - window.innerHeight/2 + post.clientHeight/2
				);
			}
			idx = $c('DESU_selected', doc);
			if(idx) {
				idx.className = idx.oldClassName;
			}
			if(post.isOp) {
				post = post.thr;
			}
			post.oldClassName = post.className;
			post.className += ' DESU_selected';
			return mIdx;
		},
		scrollDownToPost = function() {
			if(pIndex !== Posts.length - 1) {
				try {
					pIndex = scrollToPost(
						Posts, pIndex + 1, 1,
						Posts[pIndex + 1].isOp
							|| Posts[pIndex + 1].getBoundingClientRect().top > window.innerHeight/2
							- Posts[pIndex + 1].clientHeight/2,
						false
					);
					pScroll = true;
				} catch(e) {}
			}
		},
		scrollUpToPost = function() {
			try {
				pIndex = scrollToPost(Posts, pIndex <= 0 ? 0 : pIndex - 1, -1, true, false);
				pScroll = true;
			} catch(e) {}
		};

	keyNavTrigger(doc);

	window.onscroll = function() {
		if(!scrScroll) {
			pScroll = true;
			tScroll = true;
		} else {
			scrScroll = false;
		}
	};

	doc.onkeydown = function (e) {
		var curTh,
			kc = e.keyCode;
		if(
			!isKeyNav || e.ctrlKey || e.altKey || e.shiftKey
				|| (kc !== 74 && kc !== 75 && kc !== 77 && kc !== 78 && kc !== 86)
		) {
			return;
		}
		$pd(e);
		if(tScroll) {
			pIndex = !pScroll ? Posts.indexOf(tByCnt[tIndex]) : findCurrPost(Posts);
		}
		if(!TNum && pScroll) {
			if((Posts[pIndex] || {}).isOp) {
				tIndex = curTh = tByCnt.indexOf(Posts[pIndex]);
			} else if(tScroll) {
				for(curTh = pIndex <= 0 ? 0 : pIndex; curTh > 0 && !Posts[curTh].isOp; curTh--) {}
				tIndex = curTh = tByCnt.indexOf(Posts[curTh]);
			} else {
				curTh = tIndex;
			}
		} else {
			curTh = tIndex;
		}
		pScroll = tScroll = false;
		if(kc === 86) {
			if(TNum) {
				showQuickReply(Posts[pIndex]);
			} else if(nav.Firefox) {
				GM_openInTab(getThrdUrl(aib.host, brd, tByCnt[curTh].Num), false, true);
			} else {
				window.open(getThrdUrl(aib.host, brd, tByCnt[curTh].Num), '_blank');
			}
			return;
		}
		scrScroll = true;
		if(kc === 75) {
			if(TNum) {
				scrollUpToPost();
			} else {
				try {
					tIndex = scrollToPost(tByCnt, tIndex <= 0 ? 0 : tIndex - 1, -1, true, true);
					tScroll = true;
				} catch(er) {}
			}
		} else if(kc === 74) {
			if(TNum) {
				scrollDownToPost();
			} else if(tIndex !== tByCnt.length - 1) {
				try {
					tIndex = scrollToPost(tByCnt, tIndex + 1, 1, true, true);
					tScroll = true;
				} catch(er) {}
			}
		} else if(!TNum && kc === 77) {
			scrollUpToPost();
		} else if(!TNum && kc === 78) {
			scrollDownToPost();
		}
	};
}


/*==============================================================================
								POSTFORM CHANGES
==============================================================================*/

function refreshCapSrc(src, tNum) {
	if(aib.kus || aib.tinyIb) {
		return src.replace(/\?[^?]+$|$/, (aib._410 ? '?board=' + brd + '&' : '?') + Math.random())
	}
	if(tNum > 0) {
		src = src.replace(/mainpage|res\d+/ig, 'res' + tNum);
	}
	return src.replace(/dummy=\d*/, 'dummy=' + $rnd());
}

function refreshCapImg(tNum) {
	var src, e,
		img = pr.recap ? $id('recaptcha_image') || pr.recap : $x(pr.tr + '//img', pr.cap);
	if(aib.hana || pr.recap) {
		e = doc.createEvent('MouseEvents');
		e.initEvent('click', true, true);
		img.dispatchEvent(e);
	} else {
		src = refreshCapSrc(img.getAttribute('src'), tNum);
		img.src = '';
		img.src = src;
	}
}

function doSageBtn() {
	var c = Cfg['issage'] !== 0;
	$id('DESU_sageBtn').innerHTML = '&nbsp;' + (
		c ? '<span class="DESU_btnSage"></span><b style="color: red;">SAGE</b>'
		: '<i>(no&nbsp;sage)</i>'
	);
	if(pr.mail.type === 'text') {
		pr.mail.value = c ? 'sage' : aib.fch ? 'noko' : '';
	} else {
		pr.mail.checked = c;
	}
}

function setUserName() {
	saveCfg('namval', $id('DESU_fixName').value.replace(/\|/g, ''));
	pr.name.value = $id('DESU_fixNameChk').checked ? Cfg['namval'] : '';
}

function setUserPassw() {
	var val,
		el = $id('DESU_pasval');
	if(el) {
		saveCfg('pasval', el.value.replace(/\|/g, ''));
	}
	val = Cfg['passw'] !== 0 ? Cfg['pasval'] : $rnd().substring(0, 8);
	el = $x('.//input[@type="password"]', dForm);
	if(el) {
		el.value = val;
	}
	pr.passw.value = val;
}

function initPostform() {
	var pArea = $New('center', {'id': 'DESU_parea'}, [
		$New('div', {
			'id': 'DESU_toggleReply',
			'style': 'display: none;'
		}, [
			$txt('['),
			$new('a', {
				'text': Lng.expandForm[lCode],
				'href': '#',
				'class': 'DESU_aBtn'}, {
				'click': toggleMainReply
			}),
			$txt(']')
		]),
		$New('div', {'id': 'DESU_pform'}, [pr.form, oeForm]),
		$new('hr', null, null)
	]);
	if(TNum && Cfg['pform'] === 1) {
		$after(aib.fch ? $t('hr', dForm) : dForm, pArea);
	} else {
		$before(dForm, [pArea]);
	}
	if(TNum && Cfg['pform'] === 2 || !TNum && Cfg['tform'] !== 0) {
		$disp(pArea);
	}
	$after(pArea, $new('div', {
		'id': 'DESU_qarea',
		'class': aib.pClass,
		'style': 'display: none;'
	}, null))
	if(pr.on) {
		doPostformChanges(null);
	} else if(oeForm) {
		ajaxGetPosts(null, brd, Posts[0].Num, null, doPostformChanges);
	}
}

function doPostformChanges(a) {
	var img, src, _img, sageBtn, m, load, el,
		pTxt = pr.txta,
		resMove = function(e) {
			var p = $offset(pTxt);
			pTxt.style.width = e.pageX - p.left + 'px';
			pTxt.style.height = e.pageY - p.top + 'px';
		},
		resStop = function() {
			$revent(doc.body, {'mousemove': resMove, 'mouseup': resStop});
			saveCfg('texw', parseInt(pTxt.style.width, 10));
			saveCfg('texh', parseInt(pTxt.style.height, 10));
		};
	pr.form.style.display = 'inline-block';
	pr.form.style.textAlign = 'left';
	$after(pTxt, $new('div', {
		'id': 'DESU_txtResizer'}, {
		'mousedown': function(e) {
			$pd(e);
			$event(doc.body, {
				'mousemove': resMove,
				'mouseup': resStop
			});
		}
	}));
	addTextPanel();
	pTxt.style.cssText = 'width: ' + Cfg['texw'] + 'px; height: ' + Cfg['texh'] + 'px;';
	$event(pTxt, {
		'keypress': function(e) {
			var code = e.charCode || e.keyCode;
			if((code === 33 || code === 34) && e.which === 0) {
				e.target.blur();
				window.focus();
			}
		}
	});
	$event(pr.subm, {
		'click': function(e) {
			var txt = pr.txta.value;
			pr.txta.value =
				(Cfg['spells'] === 0 || !oSpells.outrep[0] ? txt : doReplace(oSpells.outrep, txt))
					+ (Cfg['sign'] !== 0 && Cfg['sigval'] !== '' ? '\n' + Cfg['sigval'] : '');
			if(Cfg['verify'] !== 0) {
				$alert(Lng.checking[lCode], 'Upload', true);
			}
			if(Cfg['addfav'] !== 0 && pr.tNum) {
				toggleFavorites(pByNum[pr.tNum], $c('DESU_btnFav', pByNum[pr.tNum].Btns));
			}
			if(pr.tNum) {
				Stat.reply = +Stat.reply + 1;
			} else {
				Stat.op = +Stat.op + 1;
			}
			setStored('DESU_Stat_' + aib.dm, $uneval(Stat));
			if(pr.isQuick) {
				$disp($id('DESU_qarea'));
				$after($id('DESU_toggleReply'), $id('DESU_pform'));
			}
		}
	});
	$each($X('.//input[@type="text"]', pr.form), function(el) {
		el.size = 35;
	});
	if(Cfg['nogoto'] !== 0 && pr.gothr) {
		$disp(pr.gothr);
	}
	if(Cfg['nopass'] !== 0 && pr.passw) {
		$disp($x(pr.tr, pr.passw));
	}
	if(Cfg['name'] !== 0 && pr.name) {
		setTimeout(function() {
			pr.name.value = Cfg['namval'];
		}, 0);
	}
	if(pr.passw) {
		setTimeout(setUserPassw, 0);
	}
	if(pr.recap) {
		$attr(pr.subm, {'onclick': 'Recaptcha.focus_response_field = function() {}'});
		el = $id('recaptcha_image');
		if(el) {
			$attr(el, {
				'onclick': 'Recaptcha.reload()',
				'style': 'width: 300px; cursor: pointer;'
			});
		}
		el = $id('recaptcha_reload_btn');
		if(el) {
			$disp(el.parentNode);
		}
	}
	if(pr.cap) {
		setTimeout(function() {
			if(aib.abu) {
				refreshCapImg(0);
				$rattr(pr.cap, 'onclick');
			}
		}, 0);
		$rattr(pr.cap, 'onfocus');
		$rattr(pr.cap, 'onkeypress');
		$event($attr(pr.cap, {
			'autocomplete': 'off'}), {
			'keypress': function(e) {
				var code = e.charCode || e.keyCode,
					chr = String.fromCharCode(code).toLowerCase(),
					ru = 'йцукенгшщзхъфывапролджэячсмитьбюё',
					en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`',
					i = en.length;
				if(Cfg['forcap'] === 0 || e.which === 0) {
					return;
				}
				if(Cfg['forcap'] === 1) {
					if(code < 0x0410 || code > 0x04FF) {
						return;
					}
					while(i--) {
						if(chr === ru[i]) {
							chr = en[i];
						}
					}
				} else {
					if(code < 0x0021 || code > 0x007A) {
						return;
					}
					while(i--) {
						if(chr === en[i]) {
							chr = ru[i];
						}
					}
				}
				$pd(e);
				insertInto(e.target, chr);
			}
		});
		if(!aib.hana && !pr.recap) {
			if(aib.kus) {
				img = $x('.//a|.//img', $x(pr.tr, pr.cap));
				src =
					aib._410 ? ('/faptcha.php?board=' + brd)
					: aib.hid ? ('/securimage/securimage_show.php?' + Math.random())
					: '/' + brd.substr(0, brd.indexOf('/') + 1) + 'captcha.php?' + Math.random();
			} else {
				img = $x(pr.tr + '//img', pr.cap);
				src = img ? img.src : '/' + brd + '/captcha.pl?key=mainpage&amp;dummy=' + $rnd();
			}
			_img = $new('img', {
				'alt': Lng.loading[lCode],
				'title': Lng.refresh[lCode],
				'style': 'display: block; border: none; cursor: pointer;',
				'src': refreshCapSrc(src, TNum || 0)}, {
				'click': function() {
					refreshCapImg(TNum || 0);
				}
			});
			if(img) {
				img.parentNode.replaceChild(_img, img);
			} else {
				while(pr.cap.nextSibling) {
					$del(pr.cap.nextSibling);
				}
				$after(pr.cap, _img);
			}
		}
	}
	if(Cfg['sagebt'] !== 0 && pr.mail) {
		sageBtn = $new('span', {
			'id': 'DESU_sageBtn'}, {
			'click': function(e) {
				e.stopPropagation();
				$pd(e);
				toggleCfg('issage');
				doSageBtn();
			}
		});
		m = $x('ancestor::label', pr.mail) || pr.mail;
		if(m.nextElementSibling || m.previousElementSibling) {
			$disp(m);
			$after(m, sageBtn);
		} else {
			$disp($x(pr.tr, pr.mail));
			$after(pr.name || pr.subm, sageBtn);
		}
		setTimeout(doSageBtn, 0);
	}
	if(Cfg['verify'] !== 0) {
		if(nav.h5Rep) {
			pr.form.onsubmit = function(e) {
				$pd(e);
				setTimeout(function() {
					prepareData(pr.form, function(by, data) {
						ajaxCheckSubmit(pr.form, by, data, checkUpload);
					});
				}, 1e3);
			};
			dForm.onsubmit = function(e) {
				$pd(e);
				$alert(Lng.deleting[lCode], 'Deleting', true);
				$each($X('.//input[@type="checkbox"]', dForm), function(el) {
					el.onclick = function() {
						return false;
					}
				});
				prepareData(dForm, function(by, data) {
					ajaxCheckSubmit(dForm, by, data, checkDelete);
				});
			};
			aib.rJpeg = !aib.fch;
		} else {
			if(aib.nul) {
				pr.form.action = pr.form.action.replace(/https/, 'http');
			}
			load = nav.Opera ? 'DOMFrameContentLoaded' : 'load';
			$after($c('DESU_content', doc), $event($add(
				'<iframe name="DESU_iframe" id="DESU_iframe" src="about:blank" />'
			), {
				load: function() {
					setTimeout(iframeCheckSubmit, 500);
				}
			}));
			$rattr($attr(pr.form, {'target': 'DESU_iframe'}), 'onsubmit');
		}
	}
	if(pr.file) {
		eventFiles($x(pr.tr, pr.file));
	}
	if(aib.nul) {
		el = $id('posttypeindicator');
		if(el) {
			$del(el.parentNode);
		}
		pr.cap.style.cssText = 'display: block; float: left; margin-top: 1em;';
	}
}

function eventFiles(tr) {
	$each($X('.//input[@type="file"]', tr), function(el) {
		$event(el, {'change': processInput});
	});
}

function processInput(e) {
	if(!this.haveBtns) {
		this.haveBtns = true;
		$after(this, $event($add('<button class="DESU_fileUtil">'
			+ Lng.clear[lCode] + '</button>'), {'click': clearInput}));
	} else if(this.rarJPEG) {
		this.rarJPEG = null;
		$del(this.nextSibling);
	}
	if(aib.rJpeg) {
		$del($c('DESU_delFile', this.parentNode));
		 if(/^image\/(?:png|jpeg)$/.test(this.files[0].type)) {
			$after(this.nextSibling, $event($add('<button class="DESU_fileUtil DESU_delFile">'
				+ Lng.makeRjpeg[lCode] + '</button>'), {'click': makeRarjpeg}));
		}
	}
	eventFiles($x(pr.tr, this));
}

function clearInput(e) {
	$pd(e);
	var pn = this.parentNode;
	delFileUtils(pn);
	pr.file = $x('input[@type="file"]', $html(pn, pn.innerHTML));
	$event(pr.file, {'change': processInput});
}

function makeRarjpeg(e) {
	$pd(e);
	var el = $id('DESU_arInput'),
		inp = $x('input[@type="file"]', this.parentNode),
		btn = this;
	if(!el) {
		el = doc.body.appendChild($new('input', {
			'id': 'DESU_arInput',
			'type': 'file',
			'style': 'display: none'
		}, null));
	}
	el.onchange = function(e) {
		$del(btn);
		readArch(inp, el.files[0]);
	};
	el.click();
}

function readArch(inp, file) {
	var fr = new FileReader(),
		el = $add('<span class="DESU_fileUtil" style="margin: 0 5px;"><span class="DESU_wait"></span>'
			+ Lng.wait[lCode] + '</span>');
	$after(inp, el);
	fr.onload = function() {
		if(inp.nextSibling === el) {
			$after(inp, $add('<span class="DESU_fileUtil" style="font-weight: bold; margin: 0 5px;" title="'
				+ inp.files[0].name + ' + ' + file.name + '">Rarjpeg</span>'));
			inp.rarJPEG = this.result;
			$del(el);
		}
	};
	fr.readAsArrayBuffer(file);
}

function delFileUtils(el) {
	var els = el.getElementsByClassName('DESU_fileUtil'),
		i = els.length - 1;
	for(; i >= 0; i--) {
		$del(els[i]);
	}
	$each($X('.//input[@type="file"]', el), function(elm) {
		elm.rarJPEG = null;
	});
}


/*==============================================================================
							ONSUBMIT REPLY / DELETE CHECK
==============================================================================*/

function ajaxCheckSubmit(form, by, data, fn) {
	var headers = {'Content-type': 'multipart/form-data; boundary=' + by};
	if(nav.Firefox) {
		headers['Referer'] = '' + doc.location;
	}
	GM_xmlhttpRequest({
		'method': form.method,
		'headers': headers,
		'data': data,
		'url': form.action,
		'onreadystatechange': function(xhr) {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					fn(HTMLtoDOM(xhr.responseText), xhr.finalUrl);
				} else {
					$alert(
						xhr.status === 0
							? Lng.noConnect[lCode]
							: 'HTTP [' + xhr.status + '] ' + xhr.statusText,
						'Upload', false
					);
				}
			}
		}
	});
}

function iframeCheckSubmit() {
	var frm = $id('DESU_iframe');
	try {
		frm = frm.contentDocument;
		if(!frm || !frm.body || !frm.body.innerHTML) {
			return;
		}
	} catch(e) {
		$alert('Iframe load error:\n' + e, 'Upload', false);
		return;
	}
	checkUpload(frm, '' + frm.location);
	frm.location.replace('about:blank');
}

function checkUpload(dc, url) {
	var err, tNum,
		txt = '',
		qArea = $id('DESU_qarea'),
		xp =
			aib.hana && !dc.getElementById('delete_form') ? './/td[@class="post-error"]'
			: aib.krau && !$t('form', dc) ? './/td[starts-with(@class,"message_text")]'
			: aib.abu && !dc.getElementById('delform') ? './/font[@size="5"]'
			: '',
		lFunc = function() {
			closeAlert($id('DESU_alertUpload'));
		};
	if(xp || !$t('form', dc)) {
		if(!xp) {
			xp =
				aib.kus ? './/h1|.//h2|.//div[contains(@style,"1.25em")]'
				: aib.fch ? './/table//font/b'
				: aib.gazo ? './/font[@size="5"]'
				: aib._420 ? './/pre'
				: '';
		}
		if(xp) {
			$each(dc.evaluate(xp, dc, null, 6, null), function(el) {
				txt += el.innerHTML + '\n';
			});
		} else {
			xp = $t('h2', dc) || $t('h1', dc);
			if(xp) {
				txt = xp.innerHTML.replace(/<br.*/i, '');
			}
		}
		err = txt !== '' ? txt : Lng.error[lCode] + '\n' + dc.body.innerHTML;
		if(/обновл|successful!|uploaded!/i.test(err)) {
			err = undefined;
		}
	}
	if(err) {
		if(pr.isQuick) {
			$disp(qArea);
			qArea.appendChild($id('DESU_pform'));
		}
		$alert(err, 'Upload', false);
	} else {
		pr.txta.value = '';
		if(pr.file) {
			err = $x(pr.tr, pr.file);
			delFileUtils(err);
			err = $html(err, err.innerHTML);
			pr.file = $x('.//input[@type="file"]', err);
			eventFiles(err)
		}
		if(pr.video) {
			pr.video.value = '';
		}
		if(pr.tNum) {
			tNum = pr.tNum;
			showMainReply();
			if(!TNum) {
				loadThread(pByNum[tNum], 5, lFunc);
			} else {
				loadNewPosts(false, lFunc);
			}
			if(pr.cap) {
				pr.cap.value = '';
				refreshCapImg(tNum);
			}
		} else {
			window.location = !aib.fch ? url : $t('meta', dc).content.match(/http:\/\/[^"]+/)[0];
		}
	}
}

function checkDelete(dc, url) {
	var allDel = true,
		cbFunc = function() {
			$each($X('.//input[@type="checkbox"]', dForm), function(el) {
				if(el.checked && !getPost(el).isDel) {
					allDel = false;
				}
				el.checked = false; el.onclick = null;
			});
			$alert(allDel ? Lng.succDeleted[lCode] : Lng.errDelete[lCode], 'Deleting', false);
		};
	if(TNum) {
		loadNewPosts(false, cbFunc);
	} else {
		//TODO: add !TNum delete checking
		cbFunc();
	}
}

function prepareData(form, fn) {
	var fd = new dataForm(),
		done = false,
		ready = 0,
		rNeeded = 0,
		i = 0,
		arr = [],
		el,
		cb = function() {
			if(done && ready === rNeeded) {
				for(ready = i, i = 0; i < ready; i++) {
					el = arr[i];
					if(el) {
						fd.append(el.name, el.val, el.type, el.fName, el.fType);
					}
				}
				fd.getResult(fn);
			}
		};
	$each($X('.//input[not(@type="submit")]|.//textarea|.//select', form), function(el) {
		if(el.type === 'file') {
			if(el.files.length > 0) {
				prepareFiles(el, function(idx, blob, name, type) {
					if(blob != null) {
						arr[idx] = {
							name: el.name,
							type: el.type,
							val: blob,
							fName: name,
							fType: type
						};
					}
					ready++;
					cb();
				}, i);
				rNeeded++;
			}
		} else if(!(el.type === 'checkbox' && !el.checked)) {
			arr[i] = {name: el.name, type: el.type, val: el.value};
		}
		i++;
	});
	done = true;
	cb();
}

function arrToBlob(arr) {
	if(nav.Firefox < 13) {
		var bb = nav.Firefox ? new MozBlobBuilder() : new WebKitBlobBuilder(),
			i = 0,
			len = arr.length;
		for(; i < len; i++) {
			bb.append(arr[i]);
		}
		return bb.getBlob();
	} else {
		return new Blob(arr);
	}
}

/** @constructor */
function dataForm() {
	this.boundary = '---------------------------' + Math.round(Math.random() * 100000000000);
	this.data = [];
}

dataForm.prototype.append = function(name, val, type, fileName, fileType) {
	this.data.push(
		'--' + this.boundary + '\r\n' + 'Content-Disposition: form-data; name="' + name + '"' + (
			type === 'file'
				? ('; filename="' + fileName + '"\r\n' + 'Content-type: ' + fileType + '\r\n\r\n')
				: '\r\n\r\n'
		), val, '\r\n'
	);
};

dataForm.prototype.getResult = function(fn) {
	var arr = this.data;
	arr.push('--' + this.boundary + '--\r\n');
	fn(this.boundary, arrToBlob(arr));
};

function removeExif(arr) {
	var i = 0,
		j = 0,
		dat = new Uint8Array(arr),
		len = dat.length - 1,
		out;
	if(dat[0] !== 0xFF || dat[1] !== 0xD8) {
		return arr;
	}
	for(; i < len; i++, j++) {
		if(dat[i] === 0xFF && (dat[i + 1] >> 4) === 0xE && dat[i + 1] !== 0xE0) {
			i += 1 + (dat[i + 2] << 8) + dat[i + 3];
			j--;
		} else if(j !== i){
			dat[j] = dat[i];
		}
	}
	if(j !== i){
		dat[j++] = dat[i];
	}
	out = new Uint8Array(++j);
	for(i = 0; i < j; i++) {
		out[i] = dat[i];
	}
	return out.buffer;
}

function prepareFiles(el, fn, i) {
	var file = el.files[0],
		fr = new FileReader();
	if(!/^image\/(?:png|jpeg)$/.test(file.type)) {
		fn(i, file, file.name, file.type);
		return;
	}
	fr.onload = function() {
		var dat = Cfg['rExif'] !== 0 && file.type === 'image/jpeg'
			? [removeExif(this.result)]
			: [this.result];
		if(el.rarJPEG) {
			dat.push(el.rarJPEG);
		}
		if(Cfg['sImgs'] !== 0) {
			dat.push(String(Math.round(Math.random()*1e6)));
		}
		fn(i, arrToBlob(dat), file.name, file.type);
	};
	fr.readAsArrayBuffer(file);
}


/*==============================================================================
									QUICK REPLY
==============================================================================*/

function showQuickReply(post) {
	var tNum = post.thr.Num,
		qArea = $id('DESU_qarea');
	pr.tNum = tNum;
	if(pr.isQuick) {
		if(aib.getWrap(post).nextElementSibling === qArea) {
			$disp(qArea);
			showMainReply();
			return;
		}
	} else {
		pr.isQuick = true;
		qArea.appendChild($id('DESU_pform'));
		$disp($id('DESU_toggleReply'));
		if(!TNum && !aib.kus && !aib.hana && !aib.ylil) {
			$del($x('.//input[@id="thr_id" or @name="parent"]', pr.form));
			$before(pr.form.firstChild, [
				$add('<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
					aib.fch || aib.gazo ? 'resto'
					: aib.tiny ? 'thread'
					: 'parent'
				) + '">')
			]);
			if(oeForm) {
				$del($x('.//input[@name="oek_parent"]', oeForm));
				$before(oeForm.firstChild, [
					$add('<input type="hidden" value="' + tNum + '" name="oek_parent">')
				]);
			}
		}
	}
	$after(aib.getWrap(post), qArea);
	qArea.style.display = '';
	if(!TNum) {
		toggleQuickReply(tNum);
		if(Cfg['tform'] !== 0) {
			$id('DESU_parea').style.display = 'none';
		}
	}
	if(pr.cap && !pr.recap && !aib.kus) {
		refreshCapImg(tNum);
	}
	if(aib._420 && pr.txta.value === 'Comment') {
		pr.txta.value = '';
	}
	insertInto(pr.txta, '>>' + post.Num + quotetxt.replace(/(^|\n)(.)/gm, '\n>$2') + '\n');
}

function showMainReply() {
	if(pr.isQuick) {
		var el = $id('DESU_toggleReply'),
			qArea = $id('DESU_qarea');
		pr.isQuick = false;
		if(!TNum) {
			toggleQuickReply(0);
			$del($x('.//input[@id="thr_id"]', pr.form));
		}
		$disp(el);
		qArea.style.display = 'none';
		$after($id('DESU_parea'), qArea);
		$after(el, $id('DESU_pform'));
	}
}

function toggleQuickReply(tNum) {
	$x('.//input[@id="thr_id" or contains(@name,"thread")]', pr.form).value = tNum;
	if(oeForm) {
		$x('.//input[@name="oek_parent" or @name="replyto"]', oeForm).value = tNum;
	}
	if(aib.pony) {
		$x('.//input[@name="quickreply"]', pr.form).value = tNum || '';
	}
}

function toggleMainReply(e) {
	var pArea = $id('DESU_parea');
	$pd(e);
	if(pr.isQuick) {
		pArea.style.display = '';
		showMainReply();
	} else {
		$disp(pArea);
	}
	$focus(pArea);
}

function insertRefLink(e) {
	var pNum = getPost(e.target).Num;
	if(!/Reply|Ответ/.test(e.target.textContent)) {
		e.stopPropagation();
		$pd(e);
		if(!TNum && Cfg['tform'] !== 0 && !pr.isQuick) {
			$id('DESU_parea').style.display = '';
		}
		if(TNum && Cfg['pform'] === 2 && !pr.isQuick) {
			showQuickReply(pByNum[pNum]);
		} else {
			if(aib._420 && pr.txta.value === 'Comment') {
				pr.txta.value = '';
			}
			insertInto(pr.txta, '>>' + pNum);
		}
	}
}


/*==============================================================================
								TEXT FORMATTING BUTTONS
==============================================================================*/

function txtBtn(id, wktag, bbtag, val) {
	var x = pr.txta,
		btn = $new('span', {'id': 'DESU_btn' + id, 'title': Lng.txtBtn[id][lCode]}, null);
	if(Cfg['txtbtn'] === 2) {
		btn.innerHTML = '<a href="#">' + val + '</a>' + (val !== '&gt;' ? ' / ' : '');
	}
	if(Cfg['txtbtn'] === 3) {
		btn.innerHTML = '<input type="button" value="' + val + '" style="font-weight: bold;" />';
	}
	if(val !== '&gt;') {
		$event(btn, {
			'click': function(e) {
				var tag1, tag2, j, len,
					start = x.selectionStart,
					end = x.selectionEnd,
					scrtop = x.scrollTop,
					text = x.value.substring(start, end).split('\n'),
					i = text.length;
				$pd(e);
				if(aib.kus || aib.abu || aib.krau || aib._420 || aib.fch && wktag === '%%') {
					tag1 = '[' + bbtag + ']';
					tag2 = '[/' + bbtag + ']';
				} else {
					tag1 = tag2 = wktag;
				}
				while(i--) {
					if(tag1 === '') {
						j = text[i].trim().length;
						while(j--) {
							tag2 += '^H';
						}
					}
					len = end + tag1.length + tag2.length;
					if(text[i].match(/^\s+/)) {
						tag1 = text[i].match(/^\s+/)[0] + tag1;
					}
					if(text[i].match(/\s+$/)) {
						tag2 += text[i].match(/\s+$/)[0];
					}
					text[i] = tag1 + text[i].trim() + tag2;
				}
				x.value = x.value.substr(0, start) + text.join('\n') + x.value.substr(end);
				x.setSelectionRange(len, len);
				x.focus();
				x.scrollTop = scrtop;
			}
		});
	} else {
		$event(btn, {
			'mouseover': function() {
				quotetxt = txtSelection();
			},
			'click': function(e) {
				var start = x.selectionStart,
					end = x.selectionEnd;
				$pd(e);
				insertInto(x, '> ' + (
					start === end ? quotetxt: x.value.substring(start, end)
				).replace(/\n/gm, '\n> '));
			}
		});
	}
	return btn;
}

function addTextPanel() {
	$del($id('DESU_txtPanel'));
	if(Cfg['txtbtn'] !== 0 && pr.txta) {
		$after(
			Cfg['txtpos'] === 0 ? (
				aib.abu ? $id('hideUserFlds')
				: aib._420 ? $c('popup', pr.form)
				: pr.subm
			) : $id('DESU_txtResizer'),
			$New('span', {'id': 'DESU_txtPanel'}, [
				$txt(unescape('%u00A0')),
				$if(Cfg['txtbtn'] === 2, $txt('[ ')),
				txtBtn('Bold', '**', aib._420 ? '**' : 'b', 'B'),
				txtBtn('Italic', '*', aib._420 ? '*' : 'i', 'i'),
				$if(!aib._420, txtBtn('Under', '__', 'u', 'U')),
				$if(!aib._420, txtBtn('Strike', aib._410 ? '^^' : '', 's', 'S')),
				txtBtn('Spoil', '%%', aib._420 ? '%' : 'spoiler', '%'),
				txtBtn('Code', '`', aib.krau ? 'aa' : aib._420 ? 'pre' : 'code', 'C'),
				txtBtn('Quote', '', '', '&gt;'),
				$if(Cfg['txtbtn'] === 2, $txt(' ]'))
			])
		);
	}
}


/*==============================================================================
								FOR POSTS AND THREADS
==============================================================================*/

function forEachPost(fn) {
	for(var post, i = 0; post = Posts[i++];) {
		fn(post);
	}
}

function getPost(el) {
	return $x('ancestor::*[contains(@class," DESU_post") or contains(@class," DESU_oppost")]', el);
}

function getImages(post) {
	return $X('.//img[@class="thumb" or contains(@src,"thumb") or contains(@src,"/spoiler") or starts-with(@src,"blob:")]', post);
}

function getTitle(post) {
	var title = $c(aib.cTitle, post);
	return title && title.textContent.trim() || post.Text.substring(0, 70).replace(/\s+/g, ' ');
}

function getText(el) {
	return (
		el.innerText
			|| el.innerHTML
				.replace(/<\/?(?:br|p|li)[^>]*?>/gi,'\n')
				.replace(/<[^>]+?>/g,'')
				.replace(/&gt;/g, '>')
				.replace(/&lt;/g, '<')
	).trim();
}

function getImgWeight(post) {
	var inf = aib.getImgInfo(post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0],
		w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) {
		w = w*1e3;
	}
	if(/\d[\s]*B/.test(inf)) {
		w = (w/1e3).toFixed(2);
	}
	return +w;
}

function getImgSize(post) {
	var el = aib.getImgInfo(post),
		m = el ? el.textContent.match(/\d+[x×]\d+/) : false;
	return m ? m[0].split(/[x×]/) : [null, null];
}

/*--------------------------------Post buttons--------------------------------*/

function prepareButtons() {
	pPanel = $New('span', {'class': 'DESU_postPanel'}, [
		$add('<span class="DESU_btnHide" onclick="DESU_hideClick(this)" onmouseover="DESU_hideOver(this)" onmouseout="DESU_delSelection(this)"></span>'),
		$if(pr.on || oeForm,
			$add('<span class="DESU_btnRep" onclick="DESU_qReplyClick(this)" onmouseover="DESU_qReplyOver(this)"></span>')
		)
	]);
	opPanel = pPanel.cloneNode(true);
	opPanel.className += '_op';
	$append(opPanel, [
		$if(!TNum, 
			$add('<span class="DESU_btnExpthr" onclick="DESU_expandClick(this)" onmouseover="DESU_expandOver(this)" onmouseout="DESU_delSelection(this)"></span>')
		),
		$add('<span class="DESU_btnFav" onclick="DESU_favorClick(this)"></span>')
	]);
	var script = doc.createElement('script');
	script.id = 'DESU_script';
	script.type = 'text/javascript';
	doc.head.appendChild(script);
	script.textContent = 
		'function DESU_hideClick(el) {\
			window.postMessage("D" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_hideOver(el) {\
			window.postMessage("A" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_delSelection(el) {\
			window.postMessage("G" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_qReplyClick(el) {\
			window.postMessage("F" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_qReplyOver(el) {\
			window.postMessage("C" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_expandClick(el) {\
			window.postMessage("E" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_expandOver(el) {\
			window.postMessage("B" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_favorClick(el) {\
			window.postMessage("H" + el.parentNode.id.substring(9), "*");\
		}\
		function DESU_sageClick(el) {\
			window.postMessage("I" + el.parentNode.id.substring(9), "*");\
		}';
	window.addEventListener('message', function(event) {
		var name = event.data[0],
			post = pByNum[+event.data.substring(1)];
		if(name === "A") {
			selectPostHider(post);
		} else if(name === "B") {
			selectExpandThread(post);
		} else if(name === "C") {
			quotetxt = txtSelection();
		} else if(name === "D") {
			togglePostVisib(post);
		} else if(name === "E") {
			loadThread(post, 1, null);
		} else if(name === "F") {
			showQuickReply(post);
		} else if(name === "G") {
			$del($id('DESU_select'));
		} else if(name === "H") {
			toggleFavorites(post, $c('DESU_btnFav', post) || $c('DESU_btnFavSel', post));
		} else if(name === "I") {
			applySpells('#sage');
		}
	}, false);
}

function addPostButtons(post) {
	var ref = aib.getRef(post);
	post.Btns = (!post.isOp ? pPanel : opPanel).cloneNode(true);
	post.Btns.id = 'DESU_btns' + post.Num;
	if(aib.getSage(post)) {
		post.Btns.appendChild($new('span', {
			'class': 'DESU_btnSage',
			'title': 'SAGE',
			'onclick': 'DESU_sageClick(this)'
		}, null));
	}
	$after(ref, post.Btns);
	if(pr.on && Cfg['insnum'] !== 0) {
		if(aib.futr) {
			$each($X('a', ref), function(el) {
				$rattr(el, 'onclick');
			});
		}
		if(!aib.brit) {
			ref.onclick = insertRefLink;
		}
	}
}

/*---------------------------------Time correction-----------------------------*/

function toggleTimeSettings() {
	var el = $id('DESU_ctime');
	if(el.checked && (!/^[+-]\d{1,2}$/.test(Cfg['ctmofs']) || !parseTimePattern())) {
		$alert(Lng.cTimeError[lCode], 'TimeErr', false);
		saveCfg('ctime', 0);
		el.checked = false;
	}
}

function parseTimePattern() {
	if(/[^\?\-\+sihdmny]|mm/.test(Cfg['ctmpat'])) {
		return false;
	}
	timeRegex = Cfg['ctmpat']
		.replace(/\-/g, '[^<]')
		.replace(/\+/g, '[^0-9]')
		.replace(/([sihdny]+)/g, '($1)')
		.replace(/[sihdny]/g, '\\d')
		.replace(/\m/g, '([a-zA-Zа-яА-Я]+)');
	timePattern = Cfg['ctmpat'].replace(/[\?\-\+]+/g, '').replace(/([a-z])\1+/g, '$1');
	return true;
}

function fixTime(txt) {
	var a, t, second, minute, hour, day, month, year, dtime;
	return txt.replace(new RegExp(timeRegex, 'g'), function(str, a1, a2, a3, a4, a5, a6) {
		for(var i = 0, arr = [a1, a2, a3, a4, a5, a6]; i < 6; i++) {
			a = arr[i];
			t = timePattern[i];
			t === 's' ? second = a
			: t === 'i' ? minute = a
			: t === 'h' ? hour = a
			: t === 'd' ? day = a
			: t === 'n' ? month = a - 1
			: t === 'y' ? year = a
			: t === 'm' && (month =
				/янв|jan/i.test(a) ? 0
				: /фев|feb/i.test(a) ? 1
				: /мар|mar/i.test(a) ? 2
				: /апр|apr/i.test(a) ? 3
				: /май|may/i.test(a) ? 4
				: /июн|jun/i.test(a) ? 5
				: /июл|jul/i.test(a) ? 6
				: /авг|aug/i.test(a) ? 7
				: /сен|sep/i.test(a) ? 8
				: /окт|oct/i.test(a) ? 9
				: /ноя|nov/i.test(a) ? 10
				: /дек|dec/i.test(a) && 11
			);
		}
		dtime = new Date(year.length === 2 ? '20' + year : year, month, day, hour, minute, second || 0);
		dtime.setHours(dtime.getHours() + parseInt(Cfg['ctmofs'], 10));
		return dtime.toString().replace(/GMT.*$/, '');
	});
}


/*==============================================================================
							ON LINKS VIDEO / MP3 PLAYERS
==============================================================================*/

function getTubeVideoLinks(id, fn) {
	id = '//www.youtube.com/watch?v=' + id;
	GM_xmlhttpRequest({method: 'GET', url: id, onload: function(xhr) {
		var i, group, len, elem, result1, result2, src,
			sep1 = '%2C',
			sep2 = '%26',
			sep3 = '%3D',
			url = [],
			formats = xhr.responseText.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
		if(!formats) {
			fn(false);
			return;
		}
		formats = formats[1];
		if(formats.indexOf(',') >= 0) {
			sep1 = ',';
			sep2 = formats.indexOf('&') >= 0 ? '&' : '\\u0026';
			sep3 = '=';
		}
		for(i = 0, group = formats.split(sep1), len = group.length; i < len; i++) {
			elem = group[i].split(sep2);
			if(elem.length < 5) {
				continue;
			}
			result1 = elem[0].split(sep3);
			if(result1.length < 2) {
				continue;
			}
			src = unescape(unescape(result1[1])).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
			result2 = elem[4].split(sep3);
			if(result2.length < 2) {
				continue;
			}
			if(src.toLowerCase().indexOf('http') === 0) {
				url[result2[1]] = src;
			}
		}
		fn(url);
	}});
}

function addTubeEmbed(el, id, time) {
	var wh = ' width="' + Cfg['ywidth'] + '" height="' + Cfg['yheigh'] + '" />';
	el.innerHTML = Cfg['yptype'] === 1
		? '<iframe type="text/html" src="https://www.youtube.com/embed/' + id
			+ (Cfg['yhdvid'] !== 0 ? '?hd=1&' : '?')
			+ 'start=' + time + '&html5=1" frameborder="0"' + wh
		: '<embed type="application/x-shockwave-flash" src="https://www.youtube.com/v/' + id
			+ (Cfg['yhdvid'] !== 0 ? '?hd=1&' : '?')
			+ 'start=' + time + '" wmode="transparent"' + wh;
}

function addTubePlayer(el, m) {
	var id = m[1],
		time = (m[2] ? m[2] * 3600 : 0) + (m[3] ? m[3] * 60 : 0) + (m[4] ? m[4] : 0);
	if(Cfg['yptype'] !== 2) {
		addTubeEmbed(el, id, time);
		return;
	}
	getTubeVideoLinks(id, function(url) {
		var src = url ? (Cfg['yhdvid'] === 0 ? url[43] : url[45] || url[44] || url[43]) : false;
		if(!src) {
			addTubeEmbed(el, id, time);
			return;
		}
		el.innerHTML = '<video poster="https://i.ytimg.com/vi/' + id
			+ '/0.jpg" controls="controls" preload="none" src="' + src
			+ (nav.Firefox && nav.Firefox < 14 ? '&' + Math.random() : '')
			+ '" width="' + Cfg['ywidth'] + '" height="' + Cfg['yheigh'] + '"></video>';
		el = el.firstChild;
		addTubeEmbed(el, id, time);
		if(time !== 0) {
			$event(el, {
				'loadedmetadata': function() {
					this.currentTime = time;
				}
			});
		}
	});
}

function addTubePreview(el, m) {
	el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + m[1]
		+ '" target="_blank"><img src="https://i.ytimg.com/vi/' + m[1]
		+ '/0.jpg" width="360" height="270" /></a>';
	$event(el.firstChild, {
		'click': function(e) {
			if(Cfg['ytube'] !== 4) {
				$pd(e);
				addTubePlayer(this.parentNode, m);
			}
		}
	});
}

function getTubePattern() {
	return /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?)?$/;
}

function clickTubeLink(e) {
	var m = this.href.match(getTubePattern()),
		el = $c('DESU_ytObj', getPost(this));
	$pd(e);
	if($xb('node()[contains(@src,"' + m[1] + '")]|video[contains(@poster,"' + m[1] + '")]', el)) {
		el.innerHTML = '';
	} else if(Cfg['ytube'] > 2 && !$xb('a[contains(@href,"' + m[1] + '")]', el)) {
		addTubePreview(el, m);
	} else {
		addTubePlayer(el, m);
	}
}

function addLinkTube(post) {
	if(Cfg['ytube'] === 0) {
		return;
	}
	$each($X('.//embed', post || dForm), function(el) {
		var src,
			m = el.src.match(getTubePattern());
		if(!m) {
			return;
		}
		src = 'https://www.youtube.com/watch?v=' + m[1];
		if(m[4] || m[3] || m[2]) {
			src += '#t='
				+ (m[2] ? m[2] + 'h' : '')
				+ (m[3] ? m[3] + 'm' : '')
				+ (m[4] ? m[4] + 's' : '');
		}
		aib.getMsg(post || getPost(el)).appendChild(
			$add('<p><a href="' + src + '">' + src + '</a></p>')
		);
		$del(el.parentNode);
	});
	$each($X('.//a[contains(@href,"youtu")]', post || dForm), function(link) {
		var pst, el, msg, pWrap,
			m = link.href.match(getTubePattern());
		if(!m) {
			return;
		}
		link.href = link.href.replace(/^http:/, 'https:');
		pst = post || getPost(link);
		el = $c('DESU_ytObj', pst);
		if(!el) {
			el = $new('div', {'class': 'DESU_ytObj'}, null);
			if(Cfg['ytube'] > 2) {
				addTubePreview(el, m);
			} else if(Cfg['ytube'] === 2) {
				addTubePlayer(el, m);
			}
			msg = pst.Msg || aib.getMsg(pst);
			pWrap = aib.picWrap && $x('div[' + aib.picWrap + '][last()]', pst);
			if(pWrap) {
				$after(pWrap, el);
			} else if(msg) {
				$before(msg, [el]);
			} else {
				pst.appendChild(el);
			}
		}
		link.className = 'DESU_ytLink';
		$event(link, {'click': clickTubeLink});
		if(!nav.Opera && Cfg['ytitle'] !== 0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://gdata.youtube.com/feeds/api/videos/' + m[1]
					+ '?alt=json&fields=title/text(),yt:noembed,app:control/yt:state/@reasonCode',
				onload: function(xhr) {
					try {
						link.textContent = JSON.parse(xhr.responseText)['entry']['title']['$t'];
						filterTextTube(pst, link.textContent);
					} catch(e) {}
				}
			});
		} else {
			link.textContent = link.textContent.replace(/^http:/, 'https:');
		}
	});
}

function filterTextTube(post, text) {
	var t,
		i = 0,
		fHide = (function(a) {
			return a ? hidePost : function(b, c) {};
		})(Cfg['spells'] === 1);
	for(;t = oSpells.video[i++];) {
		if(strToRegexp(t).test(text)) {
			fHide(post, '#video ' + t);
			post.tHide = 1;
			if(hideTubeDelay) {
				clearTimeout(hideTubeDelay);
			}
			hideTubeDelay = setTimeout(saveHiddenPosts, 500);
			return;
		}
	}
}

function unHideTextTube() {
	forEachPost(function(post) {
		if(post.tHide === 1) {
			unhidePost(post);
			post.tHide = 0;
		}
	});
}

function hideTextTube() {
	if(Cfg['ytitle'] === 0) {
		return;
	}
	$each($X('.//a[contains(@href,"youtu")]', dForm), function(link) {
		for(var i = 0, t, post; t = oSpells.video[i++];) {
			if(strToRegexp(t).test(link.textContent)) {
				post = getPost(link);
				hidePost(post, '#video ' + t);
				post.tHide = 1;
				break;
			}
		}
	});
}

function addLinkMP3(post) {
	if(Cfg['mp3'] === 0) {
		return;
	}
	$each($X('.//a[contains(@href,".mp3")]', post || dForm), function(link) {
		var pst, el, msg;
		if(!(link.target === '_blank' || link.rel === 'nofollow')) {
			return;
		}
		pst = post || getPost(link);
		el = $c('DESU_mp3', pst);
		if(!el) {
			el = $new('div', {'class': 'DESU_mp3'}, null);
			msg = pst.Msg || aib.getMsg(pst);
			if(msg) {
				$before(msg, [el]);
			} else {
				pst.appendChild(el);
			}
		}
		if(!$xb('.//object[contains(@FlashVars,"' + link.href + '")]', el)) {
			$html(el, el.innerHTML + '<object data="//junglebook2007.narod.ru/audio/player.swf" type="application/x-shockwave-flash" wmode="transparent" width="220" height="16" FlashVars="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '"></object><br>');
		}
	});
}


/*==============================================================================
									IMAGES VIEWER
==============================================================================*/

function makeMoveable(el) {
	var elMove = function(e) {
			el.style.left = e.clientX - el.curX + 'px';
			el.style.top = e.clientY - el.curY + 'px';
			el.moved = true;
		},
		elStop = function() {
			$revent(doc.body, {'mousemove': elMove, 'mouseup': elStop});
		};
	$event(el, {
		'mousedown': function(e) {
			$pd(e);
			el.curX = e.clientX - parseInt(el.style.left, 10);
			el.curY = e.clientY - parseInt(el.style.top, 10);
			$event(doc.body, {
				'mousemove': elMove,
				'mouseup': elStop
			});
		}
	});
}

function resizeImg(e) {
	var curX = e.clientX,
		curY = e.clientY,
		oldL = parseInt(this.style.left, 10),
		oldT = parseInt(this.style.top, 10),
		oldW = this.width,
		oldH = this.height,
		d = nav.Opera || nav.Chrome ? e.wheelDelta : -e.detail,
		newW = parseInt(this.width*(d > 0 ? 1.25 : 0.8), 10),
		newH = parseInt(this.height*(d > 0 ? 1.25 : 0.8), 10);
	$pd(e);
	this.width = newW;
	this.height = newH;
	this.style.left = parseInt(curX - (newW/oldW)*(curX - oldL), 10) + 'px';
	this.style.top = parseInt(curY - (newH/oldH)*(curY - oldT), 10) + 'px';
}

function addFullImg(a, sz, isExp) {
	var newW = '',
		newH = '',
		fullW = +sz[0],
		fullH = +sz[1],
		scrW = doc.body.clientWidth,
		scrH = window.innerHeight,
		full = $c('DESU_fullImg', a);
	if(full && isExp || !full && isExp === false) {
		return;
	}
	if(Cfg['expimg'] === 1 && !$xb('img[contains(@style,"fixed")]', a)) {
		$disp($t('img', a));
	}
	if(full) {
		if(!full.moved) {
			$disp(full);
			setTimeout(function() {
				$del(full);
			}, 0);
		} else {
			full.moved = false;
		}
		return;
	}
	if(Cfg['expimg'] === 1) {
		scrW -= $offset(a).left + 25;
	} else {
		$del($c('DESU_cFullImg', doc));
	}
	if(fullW && fullH) {
		newW = fullW < scrW ? fullW : scrW;
		newH = newW*fullH/fullW;
		if(Cfg['expimg'] === 2 && newH > scrH) {
			newH = scrH;
			newW = newH*fullW/fullH;
		}
	}
	full = a.appendChild($add('<img class="DESU_fullImg" src="' + a.href +
		'" alt="' + a.href + '" width="' + newW + '" height="' + newH + '"/>'
	));
	if(Cfg['expimg'] === 2) {
		full.className += ' DESU_cFullImg';
		full.style.cssText = 'left: ' + (scrW - newW) / 2 + 'px; top: ' + (scrH - newH) / 2 + 'px;';
		full.addEventListener(
			nav.Opera || nav.Chrome ? 'mousewheel' : 'DOMMouseScroll',
			resizeImg, false
		);
		makeMoveable(full);
	}
}

function addLinkImg(el, addBr) {
	if(Cfg['addimg'] === 0) {
		return;
	}
	$each($X(
		aib.xMsg + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]',
		el
	), function(link) {
		if($xb('ancestor::small', link)) {
			return;
		}
		var a = link.cloneNode(false);
		a.target = '_blank';
		$disp(a);
		a.appendChild($new('img', {
			'class': 'DESU_preImg',
			'src': a.href,
			'alt': a.href}, {
			'load': function() {
				var fullW, fullH, k;
				$disp(a);
				fullW = this.width;
				fullH = this.height;
				this.title = fullW + 'x' + fullH;
				if(fullW <= 200 && fullH <= 200) {
					return;
				}
				k = fullW/fullH;
				this.width = k < 1 ? 200*k : 200;
				this.height = k < 1 ? 200 : 200/k;
			}
		}));
		$event(a, {
			'click': function(e) {
				if(Cfg['expimg'] !== 0 && e.button !== 1) {
					$pd(e);
					addFullImg(this, this.firstChild.title.split('x'), null);
				}
			}
		});
		$before(link, [a, $if(addBr, $new('br', null, null))]);
	});
}

function addImgSearch(el) {
	if(!Cfg['imgsrc']) {
		return;
	}
	$each($X(aib.xImages, el), function(link) {
		if(/google\.|tineye\.com|iqdb\.org/.test(link.href)) {
			$del(link);
			return;
		}
		if(link.innerHTML.indexOf('<') >= 0) {
			return;
		}
		$before(link, [
			$new('span', {
				'class': 'DESU_btnSrc'}, {
				'mouseover': function() {
					selectImgSearch(this, escape(link.href));
				},
				'mouseout': removeSelMenu
			})
		]);
	});
}

function expandPostImg(a, post, isExp) {
	if(/\.jpe?g|\.png|.\gif|^blob:/i.test(a.href)) {
		addFullImg(a, getImgSize(
			post.Img.snapshotLength > 1 ? $x('ancestor::node()[self::div or self::td][1]', a) : post
		), isExp);
	}
}

function expandAllPostImg(post, isExp) {
	$each(post.Img, function(img) {
		expandPostImg($x('ancestor::a[1]', img), post, isExp);
	});
}

function eventPostImg(post) {
	$each(post.Img, function(img) {
		var a = $x('ancestor::a[1]', img);
		if(a) {
			$rattr(a, 'onclick');
			$rattr(img, 'onclick');
			if(aib.dfwk) {
				$rattr(img.parentNode, 'onclick');
			}
			a.addEventListener('click', function(e) {
				if(Cfg['expimg'] !== 0 && e.button !== 1) {
					$pd(e);
					expandPostImg(this, post, null);
				}
			}, false);
		}
	});
}

function parseImg(a, ab) {
	if(Cfg['rarjpeg'] !== 1) {
		return;
	}
	var dat = new Uint8Array(ab),
		i = 0,
		len = dat.length;
	if(dat[0] === 0xFF && dat[1] === 0xD8) {
		for(i = 0; i < len - 1; i++) {
			if(dat[i] === 0xFF && dat[i + 1] === 0xD9) {
				i += 2;
				break;
			}
		}
	} else if(dat[0] === 0x89 && dat[1] === 0x50) {
		for(i = 0; i < len - 7; i++) {
			if(dat[i] === 0x49 && dat[i + 1] === 0x45 && dat[i + 2] === 0x4E && dat[i + 3] === 0x44) {
				i += 8;
				break;
			}
		}
	} else {
		return;
	}
	if(i === len || len - i < 60) {
		return;
	}
	for(len = i + 50; i < len; i++) {
		if((dat[i] === 0x37 && dat[i + 1] === 0x7A) ||
			(dat[i] === 0x50 && dat[i + 1] === 0x4B) ||
			(dat[i] === 0x52 && dat[i + 1] === 0x61)
		) {
			$x(aib.xImages, aib.getPicWrap(a)).className += ' DESU_archive';
			break;
		}
	}
}

function preloadImages(el) {
	var mReqs = 4,
		cReq = 0,
		i = 0,
		arr = [],
		loadFunc = function(idx) {
			if(idx >= arr.length) {
				return;
			}
			var req,
				eImg = nav.Chrome,
				a_ = arr[idx],
				a = a_.href;
			if(/\.gif$/i.test(a)) {
				eImg = true;
			} else if(!/\.(?:jpe?g|png)$/i.test(a)) {
				loadFunc(i++);
				return;
			}
			if(cReq === mReqs) {
				setTimeout(function() {
					loadFunc(idx);
				}, 200);
				return;
			}
			cReq++;
			req = new XMLHttpRequest();
			req.open('GET', a, true);
			req.responseType = 'arraybuffer';
			req.onload = function(e) {
				if(this.status == 200) {
					a_.href = window.URL.createObjectURL(arrToBlob([this.response]));
					if(eImg) {
						$t('img', a_).src = a_.href;
					}
					parseImg(a_, this.response);
				}
				cReq--;
				loadFunc(i++);
			};
			req.send(null);
		};
	$each(getImages(el), function(img) {
		arr.push($x('ancestor::a[1]', img));
	});
	while(i < mReqs) {
		loadFunc(i++);
	}
}


/*==============================================================================
								MAP OF >>REFLINKS
==============================================================================*/

function getRefMap(post, pNum, refMap) {
	for(var rNum, els = post.Msg.getElementsByTagName('a'), i = els.length - 1; i >= 0; i--) {
		rNum = els[i].textContent.match(/^>>(\d+)$/);
		if(rNum) {
			rNum = rNum[1];
			if(refMap[rNum]) {
				if(refMap[rNum].indexOf(pNum) === -1) {
					refMap[rNum].push(pNum);
				}
			} else {
				refMap[rNum] = [pNum];
			}
		}
	}
}

function genRefMap(pBn) {
	var pNum, post,
		refMap = [];
	for(pNum in pBn) {
		getRefMap(pBn[pNum], pNum, refMap);
	}
	for(pNum in refMap) {
		post = pBn[pNum];
		if(post) {
			$after(post.Msg, $add(
				'<div class="DESU_refMap">'
					+ refMap[pNum].join(', ').replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>')
					+ '</div>'
			));
		}
	}
	refMap = null;
}

function updRefMap(post) {
	var pNum, pst, el,
		refMap = [];
	getRefMap(post, post.Num, refMap);
	for(pNum in refMap) {
		pst = pByNum[pNum];
		if(pst) {
			el = $c('DESU_refMap', pst);
			if(!el) {
				el = $new('div', {'class': 'DESU_refMap'}, null);
				$after(pst.Msg, el);
			} else {
				el.appendChild($txt(', '));
			}
			el.appendChild(
				$add(refMap[pNum].join(', ').replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>'))
			);
			eventRefLink(el);
		}
	}
	refMap = null;
}


/*==============================================================================
							ON >>REFLINKS POSTS PREVIEW
==============================================================================*/

function closePview(el) {
	if(Cfg['animp'] === 0 || !nav.Anim) {
		$del(el);
		return;
	}
	nav.aEvent(el, function() {
		$del(el);
	});
	el.style[nav.aName] = 'DESU_pClose' + (el.aTop ? 'T' : 'B') + (el.aLeft ? 'L' : 'R');
}

function delPviews(el) {
	if(!el) {
		return;
	}
	var lk = Pviews.current.lastkid || Pviews.current;
	if(el.parent) {
		el.parent.kid = null;
		Pviews.current.lastkid = el.parent;
	} else {
		Pviews.current = Pviews.isActive = false;
	}
	do {
		clearTimeout(lk.post.readDelay);
		closePview(lk.post);
	} while((lk = lk.parent) !== el.parent && lk);
}

function markPviewToDel(el, forDel) {
	if(!el) {
		return;
	}
	clearTimeout(Pviews.outDelay);
	do {
		el.forDel = forDel;
	} while(el = el.parent);
	Pviews.outDelay = setTimeout(function() {
		for(el = Pviews.current; el; el = el.kid) {
			if(el.forDel) {
				return delPviews(el);
			}
		}
	}, +Cfg['navdel']);
}

function setPviewPostion(link, pView, anim) {
	var left, uId,
		scrW = doc.body.clientWidth,
		scrH = window.innerHeight,
		x = $offset(link).left + link.offsetWidth/2,
		y = $offset(link).top,
		top = link.getBoundingClientRect().top + link.offsetHeight,
		width = 'auto',
		moved = function(e) {
			if(this.style[nav.aName]) {
				this.style.cssText = this.newPos;
				this.newPos = false;
				$Del('style[@class="DESU_moveCSS"]', doc.head);
				this.removeEventListener(nav.nEvent, moved, false);
			}
		};
	if(x < scrW / 2) {
		left = x;
		pView.aLeft = true;
		if(left + pView.offsetWidth >= scrW - 10) {
			width = (scrW - left - 10) + 'px';
		}
	} else {
		left = x - pView.offsetWidth;
		pView.aLeft = false;
		if(left < 10) {
			left = '10';
			width = (x - 10) + 'px';
		}
	}
	left += 'px';
	uId = pView.offsetHeight;
	if(top + uId < scrH - 10 || top - uId < 10) {
		top = (y + link.offsetHeight) + 'px';
		pView.aTop = true;
	} else {
		top = (y - uId) + 'px';
		pView.aTop = false;
	}
	if(left === pView.style.left && top === pView.style.top) {
		return;
	}
	if(Cfg['animp'] === 0 || !anim) {
		pView.style.cssText = 'left: ' + left + '; top: ' + top + '; width: ' + width + ';'
		return;
	}
	uId = 'DESU_mCSS' + Math.round(Math.random()*1e3);
	doc.head.appendChild($new('style', {
		'class': 'DESU_moveCSS',
		'type': 'text/css',
		'text': '@' + nav.aCFix + 'keyframes ' + uId + ' {\
			to { left: ' + left + '; top: ' + top + '; width: ' + width + '; }\
		}'
	}, null));
	if(pView.newPos) {
		pView.style.cssText = pView.newPos;
		pView.removeEventListener(nav.nEvent, moved, false);
	}
	pView.newPos = 'left: ' + left + '; top: ' + top + '; width: ' + width + ';';
	pView.addEventListener(nav.nEvent, moved, false);
	pView.style[nav.aName] = uId;
}

function markRefMap(pView, pNum) {
	($c('DESU_pPost', pView) || {}).className = '';
	($x('.//a[starts-with(text(),">>") and contains(text(),"' + pNum + '")]', pView) || {})
		.className = 'DESU_pPost';
}

function getPview(post, pNum, parent, link, txt) {
	var el, pView;
	if(!post) {
		if(!txt) {
			Pviews.deleted[pNum] = true;
		}
		pView = $add(
			'<div class="' + aib.pClass + ' DESU_info DESU_pView">'
				+ txt || Lng.postNotFound[lCode] + '</div>'
		);
	} else {
		if(post.ownerDocument === doc) {
			pView = post.cloneNode(true);
		} else {
			pView = importPost(post);
		}
		if(post.Vis === 0) {
			togglePost(pView, 1);
		}
		if(post.isOp) {
			pView.className = aib.pClass + ' DESU_post';
		}
		pView.className += ' DESU_pView';
		if(aib._7ch) {
			pView.firstElementChild.style.cssText = 'max-width: 100%; margin: 0;';
			$del($c('doubledash', pView));
		}
		pView.Num = pNum;
		$Del(
			'.//img[@class="DESU_preImg"]/ancestor::a|.//img[@class="DESU_fullImg"]|'
				+ (Cfg['ytube'] !== 2 ? 'div[@class="DESU_ytObj"]|' : '')
				+ './/span[starts-with(@class,"DESU_postPanel") or @class="DESU_btnSrc"]',
			pView
		);
		if(!pByNum[pNum]) {
			addLinkMP3(pView);
		}
		if(!pByNum[pNum] || Cfg['ytube'] !== 2) {
			addLinkTube(pView);
		}
		pView.Img = getImages(pView);
		$each(pView.Img, function(img) {
			img.style.display = '';
		});
		eventPostImg(pView);
		addLinkImg(pView, false);
		addImgSearch(pView);
		if(Cfg['navig'] === 2) {
			markRefMap(pView, parent.Num);
		}
		eventRefLink(pView);
		if(Cfg['navmrk'] !== 0) {
			pView.readDelay = setTimeout(function() {
				markViewedPost(pNum);
				saveViewedPosts(pNum);
			}, 2e3);
		}
	}
	el = pView.node = {parent: null, kid: null, lastkid: null, post: pView};
	parent = parent.node;
	pView.style.display = '';
	dForm.appendChild(pView);
	setPviewPostion(link, pView, false);
	$event(pView, {
		'mouseover': function() {
			markPviewToDel(this.node, false);
		},
		'mouseout': outRefLink
	});
	if(Pviews.current && parent) {
		if(parent.kid) {
			delPviews(parent.kid);
		}
		el.parent = parent;
		Pviews.current.lastkid = parent.kid = el;
	} else {
		delPviews(Pviews.current);
		Pviews.current = el;
	}
	markPviewToDel(el, false);
	if(Cfg['animp'] !== 0 && nav.Anim) {
		nav.aEvent(pView, function() {
			pView.style[nav.aName] = '';
		});
		pView.style[nav.aName] = 'DESU_pOpen' + (pView.aTop ? 'T' : 'B') + (pView.aLeft ? 'L' : 'R');
	}
	return el;
}

function showPview(link) {
	var b = aib.ylil
			? link['data-boardurl']
			: link.pathname.match(/^\/?(.*?)\/?(?:res|thread-|index|\d+|$)/)[1],
		tNum = (link.pathname.match(/[^\/]+\/[^\d]*(\d+)/) || [,0])[1],
		pNum = (link.textContent.match(/\d+$/) || [tNum])[0],
		post = pByNum[pNum] || (Pviews.ajaxed[b] || [])[pNum],
		parent = getPost(link),
		el = parent.node ? parent.node.kid : Pviews.current;
	if(Cfg['navdis'] === 1 && post && post.Vis === 0) {
		Pviews.isActive = false;
		return;
	}
	if(Pviews.deleted[pNum]) {
		getPview(null, pNum, parent, link, Lng.postNotFound[lCode]);
		return;
	}
	if(el && el.post.Num === pNum) {
		markPviewToDel(el, false);
		delPviews(el.kid);
		setPviewPostion(link, el.post, nav.Anim);
		markRefMap(el.post, parent.Num);
		return;
	}
	if(post) {
		getPview(post, pNum, parent, link, null);
		return;
	}
	el = getPview(
		null, pNum, parent, link,
		'<span class="DESU_wait">' + Lng.loading[lCode] + '</span>'
	);
	Pviews.ajaxed[b] = [];
	ajaxGetPosts(null, b, tNum, function(dc, post, i) {
		Pviews.ajaxed[b][post.Num] = post;
	}, function(err) {
		genRefMap(Pviews.ajaxed[b]);
		if(el && !el.forDel) {
			getPview(Pviews.ajaxed[b][pNum], pNum, parent, link, err);
		}
	});
}

function overRefLink(e) {
	if(Cfg['navig'] === 0 || /^>>$/.test(this.textContent)) {
		return;
	}
	if(!Pviews.isActive) {
		Pviews.isActive = true;
		Pviews.overDelay = setTimeout(function() {
			if(Pviews.isActive) {
				showPview(e.target);
			}
		}, +Cfg['nashow']);
	} else {
		showPview(this);
	}
}

function outRefLink() {
	clearTimeout(Pviews.overDelay);
	if(Pviews.current) {
		markPviewToDel(Pviews.current.lastkid || Pviews.current, true);
	}
}

function eventRefLink(el) {
	if(Cfg['navig'] !== 0) {
		$each($X('.//a[starts-with(text(),">>")]', el), function(link) {
			link.onmouseover = overRefLink;
			link.onmouseout = outRefLink;
		});
	}
}


/*==============================================================================
									AJAX FUNCTIONS
==============================================================================*/

function parseHTMLdata(html, b, tNum, pFn) {
	var dc = HTMLtoDOM(aib.hana
		? '<html><head></head><body><div id="' + tNum + '" class="thread">' + html + '</div></body></html>'
		: html
	);
	if(!pr.on && oeForm) {
		pr = getPostform(doc.importNode($$x('.//textarea/ancestor::form[1]', dc, dc), true));
		$before(oeForm, [pr.form]);
	}
	if(pFn) {
		try {
			parseDelform(!aib.hana ? $$x(aib.xDForm, dc, dc) : dc, dc, function(post, i) {
				pFn(dc, post, i);
			});
		} catch(e) {}
	}
	dc = null;
}

function ajaxGetPosts(url, b, tNum, pFn, fFn) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url || (fixBrd(b) + res + tNum + (aib.tire ? '.html' : docExt)),
		onreadystatechange: function(xhr) {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					parseHTMLdata(xhr.responseText, b, tNum, pFn);
					fFn();
				} else {
					fFn(
						xhr.status === 0
							? Lng.noConnect[lCode]
							: 'HTTP [' + xhr.status + '] ' + xhr.statusText
					);
				}
			}
		}
	});
}

function getJSON(url, fn) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onreadystatechange: function(xhr) {
			if(xhr.readyState === 4) {
				if(xhr.status === 304) {
					closeAlert($id('DESU_alertNewP'));
				} else {
					try {
						fn(xhr.status, xhr.statusText, JSON.parse(xhr.responseText));
					} catch(e) {
						fn(1, e.toString(), null);
					}
				}
			}
		}
	});
}

function importPost(post) {
	var el = doc.importNode(post, true);
	el.Num = post.Num;
	el.isOp = post.isOp;
	replaceDelform(el);
	return el;
}

function insertPost(thr, post) {
	var pst, el;
	if(postWrapper && post.Count !== 0) {
		pst = postWrapper.cloneNode(true);
		el = $x(aib.xPost, pst);
		if(el) {
			el.parentNode.replaceChild(post, el);
		} else {
			pst = post;
		}
	} else {
		pst = post;
	}
	thr.appendChild(pst);
}

function addPostFunc(post) {
	doPostFilters(post);
	updRefMap(post);
	eventRefLink(post);
	addLinkMP3(post);
	addLinkTube(post);
	addLinkImg(post, true);
	addImgSearch(post);
	if(Cfg['pimgs'] !== 0) {
		preloadImages(post);
	}
	if(post.Vis === 0) {
		setPostVisib(post, 0);
	}
	if(Cfg['delhd'] === 1) {
		mergeHidden(post);
	}
	if(isExpImg) {
		expandAllPostImg(post, null);
	}
}

function newPost(thr, post, i) {
	post.Msg = aib.getMsg(post);
	pushPost(post, i);
	post.Vis = getVisib(post.Num);
	post.thr = thr;
	addPostButtons(post);
	if(Cfg['expimg'] !== 0) {
		eventPostImg(post);
	}
	if(Cfg['expost'] !== 0 && !TNum) {
		expandPost(post);
	}
	addPostFunc(post);
	insertPost(thr, post);
	if(aib.tiny) {
		thr.appendChild($new('br', null, null));
	}
}

function getFullMsg(post, tNum, a, addFunc) {
	var msg = post.Msg;
	if(aib.hana) {
		$del(a.nextSibling);
		$del(a.previousSibling);
		$del(a);
		msg.replaceChild(
			$x('div[@class="postbody alternate"]', post).firstElementChild,
			msg.firstElementChild
		);
		post.Text = getText(msg);
		if(addFunc) {
			processFullMsg(post);
		}
		return;
	}
	ajaxGetPosts(null, brd, tNum, function(dc, pst, i) {
		if(pst.Num === post.Num) {
			$del(a);
			msg.parentNode.replaceChild(doc.importNode(aib.getMsg(pst), true), msg);
			post.Msg = aib.getMsg(post);
			post.Text = getText(post.Msg);
			processFullMsg(post);
			throw '';
		}
	}, function(err) {});
}

function processFullMsg(post) {
	replaceDelform(post);
	$Del('.//span[@class="DESU_btnSrc"]', post);
	addPostFunc(post);
}

function expandPost(post) {
	if(post.Vis === 0) {
		return;
	}
	var tNum = post.thr.Num,
		el = $x(
			aib.krau ? './/p[starts-with(@id,"post_truncated")]'
			: aib.hana ? './/div[@class="abbrev"]/span/a'
			: './/div[@class="abbrev"]|'
				+ './/span[@class="abbr" or @class="omittedposts" or @class="shortened"]',
			post
		);
	if(el && /long|full comment|gekürzt|слишком|длинн|мног|полная версия/i.test(el.textContent)) {
		if(Cfg['expost'] === 1) {
			getFullMsg(post, tNum, el, false);
		} else {
			$rattr(el, 'onclick');
			$event(el, {
				'click': function(e) {
					$pd(e);
					getFullMsg(post, tNum, e.target, true);
				}
			});
		}
	}
}

function loadThread(op, last, fn) {
	var i,
		psts = [],
		thr = op.thr;
	if(!fn) {
		$alert(Lng.loading[lCode], 'LoadThr', true);
	}
	ajaxGetPosts(null, brd, op.Num, function(dc, post, j) {
		psts.push(importPost(post));
	}, function(err) {
		if(err) {
			$alert(err, 'LoadThr', false);
		} else {
			showMainReply();
			$del($id('DESU_select'));
			i = thr;
			thr = i.cloneNode(false);
			i.parentNode.replaceChild(thr, i);
			op = psts[0];
			newPost(thr, op, 0);
			$after(op.Btns, $add(
				'<span>&nbsp;[<a href="' + getThrdUrl(aib.host, brd, op.Num) + '">'
					+ Lng.reply[lCode] + '</a>]</span>'
			))
			if(last === 1 || last >= psts.length - 1) {
				i = 1;
			} else {
				i = psts.length - last;
				thr.appendChild($new('div', {
					'class': 'DESU_omitted',
					'text': Lng.postsOmitted[lCode] + (psts.length - last - 1)
				}, null));
			}
			while(i < psts.length) {
				newPost(thr, psts[i], i++);
			}
			if(last > 5 || last === 1) {
				thr.appendChild($event($add(
					'<span>[<a href="#">' + Lng.collapseThrd[lCode] + '</a>]</span>'
				), {
					'click': function(e) {
						$pd(e);
						loadThread(op, 5, null);
				}}));
			}
			thr.pCount = psts.length;
			thr.Num = op.Num
			op.dTitle = getTitle(op);
			closeAlert($id('DESU_alertLoadThr'));
		}
		$focus(op);
		if(fn) {
			fn();
		}
	});
}

function loadFavorThread() {
	var el = this.parentNode.parentNode,
		favt = $c('DESU_favThr', el),
		url = this.nextElementSibling.href,
		tNum = el.id.substr(13).split('|')[2];
	if(favt.style.display !== 'none') {
		while(favt.firstChild) {
			$del(favt.firstChild);
		}
		$disp(favt);
		$del($c('DESU_favIframe', doc));
		return;
	}
	if(pByNum[tNum] && pByNum[tNum].offsetHeight) {
		$focus(pByNum[tNum]);
		return;
	}
	window.onmessage = function(e) {
		$c('DESU_wait', favt).style.display = 'none';
		favt = $c('DESU_favIframe', favt);
		favt.style.height = e.data + 'px';
	}
	$append(favt, [
		$new('iframe', {
			'name': 'DESU_favIframe',
			'class': 'DESU_favIframe',
			'src': url,
			'style': 'border: none; width: ' + (doc.body.clientWidth - 55) + 'px; height: 0px;'
		}, null),
		$add(
			'<div class="DESU_wait" style="font-size: 1.1em; text-align: center">'
				+ Lng.loading[lCode] + '</div>'
		)
	]);
	$disp(favt);
}

function loadPage(p, tClass, len) {
	var thr, page;
	$append(dForm, [
		$new('center', {
			'text': p + Lng.page[lCode],
			'style': 'font-size: 2em;'
		}, null),
		$new('hr', null, null),
		page = $new('div', {'id': 'DESU_page' + p}, null)
	]);
	ajaxGetPosts(getPageUrl(p), null, null, function(dc, post, i) {
		if(i === 0) {
			thr = $new('div', {'class': tClass}, null);
			thr.Num = post.Num;
			$append(page, [
				thr,
				$new('br', {'clear': 'left'}, null),
				$new('hr', null, null)
			]);
		}
		newPost(thr, importPost(post), i);
	}, function(err) {
		if(p === len - 1) {
			closeAlert($id('DESU_alertLPages'));
			savePostsVisib();
			readHiddenThreads();
		}
	});
}

function loadPages(len) {
	var p,
		tClass = $c('DESU_thread', dForm).className;
	$alert(Lng.loading[lCode], 'LPages', true);
	dForm.innerHTML = '';
	for(p = 0, Posts = []; p < len; p++) {
		loadPage(p, tClass, len);
	}
}

/*-------------------------------Threads updater------------------------------*/

function setUpdButtonState(state) {
	if(TNum && Cfg['updthr'] !== 3) {
		$x('.//a[starts-with(@id,"DESU_btnUpd")]', doc).id = 'DESU_btnUpd' + state;
	}
}

function endPostsUpdate() {
	setUpdButtonState('Off');
	clearInterval(ajaxInterval);
	ajaxInterval = undefined;
}

function infoNewPosts(err, inf) {
	var old;
	if(err) {
		if(err !== Lng.noConnect[lCode]) {
			$alert(Lng.thrdNotFound[lCode] + TNum + '): \n' + err, 'NewP', false);
			doc.title = '{' + err.match(/(?:\[)(\d+)(?:\])/)[1] + '} ' + doc.title;
			endPostsUpdate();
		} else {
			$alert(Lng.noConnect[lCode], 'NewP', false);
			setUpdButtonState('Warn');
		}
		return;
	}
	closeAlert($id('DESU_alertNewP'));
	if(Cfg['updthr'] === 3) {
		return;
	}
	setUpdButtonState('On');
	if(Cfg['updthr'] === 1) {
		if(doc.body.className === 'focused') {
			return;
		}
		old = doc.title.match(/^\[(\d+)\]/);
		if(old) {
			inf += +old[1];
		}
	}
	if(Cfg['updfav'] !== 0 && favIcon) {
		clearInterval(favIconInterval);
		if(inf > 0) {
			favIconInterval = setInterval(function() {
				var href = $xb('.//link[@href="' + favIcon + '"]', doc.head)
					? 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJ'
						+ 'LR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglE'
						+ 'wCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII='
					: favIcon;
				$Del('.//link[@rel="shortcut icon"]', doc.head);
				doc.head.appendChild($new('link', {
					'href': href,
					'rel': 'shortcut icon'
				}, null));
			}, 800);
		}
	}
	doc.title = (inf > 0 ? ' [' + inf + '] ' : '') + docTitle;
}

function setHanaRating() {
	$event($x('.//input[@type="button"]', doc), {
		'click': function(e) {
			setCookie('DESU_rating', $id('rating').value, 1e12);
		}
	});
}

function getHanaFile(file, pId) {
	var name,
		src = file['src'],
		thumb = file['thumb'],
		thumbW = file['thumb_width'],
		thumbH = file['thumb_height'],
		size = file['size'],
		rating = file['rating'],
		maxRating = getCookie('DESU_rating') || 'r-15',
		kb = 1024,
		mb = 1048576,
		gb = 1073741824;
	if(brd === 'b' || brd === 'rf') {
		name = thumb.substring(thumb.lastIndexOf("/") + 1);
	} else {
		name = src.substring(src.lastIndexOf("/") + 1);
		if(name.length > 17)
		name = name.substring(0, 17) + '...';
	}
	if(rating === 'r-18g' && maxRating !== "r-18g") {
		thumb = "images/r-18g.png";
	} else if(rating === 'r-18' && (maxRating !== 'r-18g' || maxRating !== 'r-18')) {
		thumb = "images/r-18.png";
	} else if(rating === 'r-15' && maxRating === 'sfw') {
		thumb = "images/r-15.png";
	} else if(rating === 'illegal') {
		thumb = "images/illegal.png";
	}
	if(thumb !== file['thumb']) {
		thumbW = 200;
		thumbH = 200;
	}
	return $New('div', {'class': 'file'}, [
		$New('div', {'class': 'fileinfo'}, [
			$txt('Файл: '),
			$new('a', {
				'href': '/' + src,
				'target': '_blank',
				'text': name
			}, null),
			$new('br', null, null),
			$new('em', {
				'text': file['thumb'].substring(file['thumb'].lastIndexOf('.') + 1) + ', ' + (
					size < kb ? size + ' B'
					: size < mb ? (size / kb).toFixed(2) + ' KB'
					: size < gb ? (size / mb).toFixed(2) + ' MB'
					: (size / gb).toFixed(2) + ' GB'
				) + ', ' + file['metadata']['width'] + 'x' + file['metadata']['height']
			}, null),
			$new('br', null, null),
			$New('a', {
				'class': 'edit_ icon',
				'href': '/utils/image/edit/' + file['file_id'] + '/' + pId
			}, [
				$new('img', {
					'title': 'edit',
					'alt': 'edit',
					'src': '/images/blank.png'
				}, null)
			])
		]),
		$New('a', {
			'href': '/' + src,
			'target': '_blank'
		}, [
			$new('img', {
				'class': 'thumb',
				'src': '/' + thumb,
				'width': thumbW,
				'height': thumbH
			}, null)
		])
	]);
}

function getHanaPost(postJson) {
	var i,
		id = postJson['display_id'],
		files = postJson['files'],
		len = files.length,
		post = $New('td', {
			'id': 'reply' + id,
			'class': 'reply DESU_post'
		}, [
			$new('a', {'name': 'i' + id}, null),
			$New('label', null, [
				$New('a', {'class': 'delete icon'}, [
					$new('input', {
						'type': 'checkbox',
						'id': 'delbox_' + id,
						'class': 'delete_checkbox',
						'value': postJson['post_id'],
						'name': id
					}, null),
					$new('img', {
						'alt': 'Удалить',
						'title': 'Mark to delete',
						'src': '/images/blank.png'
					}, null)
				]),
				$new('span', {
					'class': 'postername',
					'text': postJson['name']
				}, null),
				$txt(' ' + postJson['date'].replace(
					/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
					function(str, y, mo, d, h, m, s) {
						var dtime = new Date(y, mo - 1, d, h, m, s);
						if(Cfg['ctime'] && timeRegex) {
							dtime.setHours(dtime.getHours() + parseInt(Cfg['ctmofs'], 10));
						}
						return dtime.toString().replace(/GMT.*$/, '');
					}
				) + ' ')
			]),
			$New('span', {'class': 'reflink'}, [
				$new('a', {
					'onclick': 'Highlight(0, ' + id + ')',
					'href': '/' + brd + '/res/' + TNum + '.xhtml#i' + id,
					'text': 'No.' + id
				}, null)
			]),
			$new('br', null, null)
		]);

	for(i = 0; i < len; i++) {
		post.appendChild(getHanaFile(files[i], id));
	}
	$append(post, [
		$if(len > 1, $new('div', {'style': 'clear: both;'}, null)),
		$add('<div class="postbody">' + postJson['message_html'] + '</div>'),
		$new('div', {'class': 'abbrev'}, null)
	]);
	return post;
}

function loadNewPosts(inf, fn) {
	var el, del,
		i = 0,
		len = 0,
		thr = $x('.//div[contains(@class," DESU_thread")]', dForm);
	if(inf) {
		$alert(Lng.loading[lCode], 'NewP', true);
	}
	if(aib.hana) {
		getJSON(
			'//dobrochan.ru/api/thread/' + brd + '/' + TNum
				+ '/new.json?message_html&new_format&last_post=' + Posts[Posts.length - 1].Num,
			function(status, sText, json) {
				if(status !== 200 || json['error']) {
					infoNewPosts(
						status === 0 ? Lng.noConnect[lCode] : (sText || json['message']),
						null
					);
				} else {
					el = (json['result'] || {})['posts'];
					if(el && el.length > 0) {
						for(i = 0, len = el.length; i < len; i++) {
							del = getHanaPost(el[i]);
							replaceDelform(del);
							del.Num = el[i]['display_id'];
							newPost(thr, del, thr.pCount + i);
						}
						thr.pCount += el.length;
					}
					infoNewPosts(null, el ? el.length : 0);
				}
				if(fn) {
					fn();
				}
			}
		);
		return;
	}
	ajaxGetPosts(null, brd, TNum, function(dc, post, j) {
		el = Posts[i];
		while(el && el.Num !== post.Num) {
			if(!el.isDel) {
				el.isDel = true;
				el.Btns.className += '_del';
			}
			el = Posts[++i];
		}
		if(!el) {
			newPost(thr, importPost(post), i);
			len++;
		} else if(aib.xBan && !el.isBan) {
			del = $$x(aib.xBan, post, dc);
			if(del) {
				if(!$xb(aib.xBan, el)) {
					el.Msg.appendChild(doc.importNode(del, true));
				}
				el.isBan = true;
			}
		}
		i++;
	}, function(err) {
		infoNewPosts(err, len);
		if(!err) {
			del = Posts.length;
			while(i < del) {
				el = Posts[i++];
				if(!el.isDel) {
					el.isDel = true;
					el.Btns.className += '_del';
				}
			}
			thr.pCount = i - 1;
			savePostsVisib();
			$id('DESU_panelInfo').firstChild.textContent =
				i + '/' + getImages(dForm).snapshotLength;
		}
		if(fn) {
			fn();
		}
	});
}

function initThreadsUpdater() {
	var C = Cfg['updint'],
		t = 6e4*(C === 0 ? 0.5 : C === 1 ? 1 : C === 2 ? 1.5 : C === 3 ? 2 : C === 4 ? 5 : C === 5 ? 15 : 30);
	if(Cfg['updthr'] === 1) {
		ajaxInterval = setInterval(function() {
			loadNewPosts(false, null);
		}, t);
	} else if(Cfg['updthr'] === 2) {
		ajaxInterval = setInterval(function() {
			var cnt = 0;
			if(aib.hana) {
				getJSON(
					'//dobrochan.ru/api/thread/' + brd + '/' + TNum + '.json?new_format',
					function(status, sText, json) {
						if(status !== 200 || json['error']) {
							infoNewPosts(
								status === 0 ? Lng.noConnect[lCode] : (sText || json['message']),
								null
							);
						} else {
							infoNewPosts(null, json['result']['posts_count'] - Posts.length);
						}
					}
				);
			} else {
				ajaxGetPosts(null, brd, TNum, function(dc, pst, i) {
					cnt++;
				}, function(err) {
					infoNewPosts(err, cnt - Posts.length);
				});
			}
		}, t);
	}
}


/*==============================================================================
								POSTS/THREADS HIDERS
==============================================================================*/

function doPostFilters(post) {
	hideByWipe(post);
	if(Cfg['spells'] !== 0) {
		hideBySpells(post);
	}
}

function togglePostVisib(post) {
	setPostVisib(post, post.Vis !== 0 ? 0 : 1);
	savePostsVisib();
}

function togglePost(post, vis) {
	if(post.isOp) {
		post.thr.style.display = vis === 0 ? 'none' : '';
		return;
	}
	$each($X('following-sibling::*', $c(
		aib.krau ? 'postheader'
		: aib.ylil ? 'postinfo'
		: aib.fch ? 'postInfo'
		: aib.tiny ? 'intro'
		: aib._420 ? 'replyheader'
		: 'DESU_postPanel',
		post
	)), function(el) {
		el.style.display = vis === 0 ? 'none' : '';
	});
}

function applyPostVisib(post, vis, note) {
	var el,
		pNum = post.Num;
	if(vis === 0 && Cfg['delhd'] !== 2) {
		$event(aib.getRef(post), {
			'mouseover': function() {
				if(post.Vis === 0) {
					togglePost(post, 1);
				}
			},
			'mouseout': function() {
				if(post.Vis === 0) {
					togglePost(post, 0);
				}
			}
		});
	}
	if(post.isOp) {
		el = $id('DESU_hidThr_' + pNum);
		if(vis === 1 && el) {
			$del(el);
			toggleHiddenThread(post, 1);
		}
		if(vis === 0 && !el) {
			el = $add(
				'<div class="' + aib.pClass + '" id="DESU_hidThr_' + post.Num + '">'
					+ Lng.hiddenThrd[lCode] + ' <a href="#">№' + pNum + '</a><i> (' + (
						note ? 'autohide: ' + note
						: post.dTitle.replace(/</g, '&lt;').replace(/>/g, '&gt;')
					) + ')</i></div>'
			);
			$event($t('a', el), {
				'click': function(e) {
					$pd(e);
					togglePostVisib(post);
				}
			});
			$before(post.thr, [el]);
			toggleHiddenThread(post, 0);
			post.thr.Vis = vis;
		}
	} else if(Cfg['delhd'] === 2) {
		(aib.getWrap(post) || post).style.display = vis === 0 ? 'none' : '';
	}
	if(!sav.cookie) {
		Visib[brd + pNum] = vis;
		Expires[brd + pNum] = (new Date()).getTime() + storageLife;
	} else if(TNum) {
		Visib[post.Count] = vis;
	}
	post.Vis = vis;
}

function setPostVisib(post, vis) {
	post.Btns.firstChild.className = vis === 0 ? 'DESU_btnUnhide' : 'DESU_btnHide';
	togglePost(post, vis);
	applyPostVisib(post, vis, false);
	if(Cfg['navhid'] !== 0) {
		setTimeout(function() {
			$each($X('.//a[contains(@href,"#' + post.Num + '")]', dForm), function(el) {
				el.className = vis === 0 ? 'DESU_refHid' : '';
			});
		}, 0);
	}
}

function hidePost(post, note) {
	if(!post.noHide) {
		if(post.Vis !== 0) {
			post.Btns.appendChild($new('a', {
				'class': 'DESU_postNote DESU_aBtn',
				'text': ' autohide: ' + note + ' ',
				'href': '#'}, {
				'click': function(e) {
					$pd(e);
					$del(this);
				}
			}));
		}
		applyPostVisib(post, 0, note);
	}
}

function unhidePost(post) {
	if(!detectWipe(post)) {
		setPostVisib(post, 1);
		$del($c('DESU_postNote', post));
		hideByWipe(post);
	}
}

function saveHiddenPosts() {
	forEachPost(function(post) {
		if(post.Vis === 0) {
			setPostVisib(post, 0);
		}
	});
	savePostsVisib();
}

function mergeHidden(post) {
	var el, next;
	if(post.Vis !== 0 || post.isOp) {
		return;
	}
	el = post.previousElementSibling;
	if(!el) {
		return;
	}
	if(!/merged/.test(el.id)) {
		el = $new('span', {
			'id': 'DESU_merged_' + post.Num,
			'style': 'display: none;'
		}, null);
		$before(post, [
			$new('span', {
				'style': 'display: ; cursor: pointer;'}, {
				'click': function(e) {
					var hDiv = $id('DESU_merged_' + post.Num);
					$pd(e);
					hDiv.previousElementSibling.innerHTML =
						unescape(hDiv.style.display === 'none' ? '%u25BC' : '%u25B2')
							+ '[<i><a href="#">' + Lng.hiddenPosts[lCode]
							+ '</a>:&nbsp;' + hDiv.childNodes.length + '</i>]';
					$disp(hDiv);
				}
			}),
			el
		]);
	}
	el.appendChild(post);
	next = post.nextElementSibling;
	if(!next || getVisib(next.Num) === 1) {
		el.previousElementSibling.innerHTML =
			unescape('%u25B2') + '[<i><a href="#">' + Lng.hiddenPosts[lCode] + '</a>:&nbsp;'
				+ el.childNodes.length + '</i>]';
	}
}

function processHidden(newCfg, oldCfg) {
	if(newCfg === 2 || oldCfg === 2) {
		forEachPost(function(post) {
			if(post.Vis === 0 && !post.isOp) {
				$disp(aib.getWrap(post));
			}
		});
	}
	if(oldCfg === 1) {
		$each($X('.//span[starts-with(@id,"DESU_merged")]', doc), function(el) {
			var px = el.childNodes,
				i = px.length;
			while(i--) {
				$after(el, px[i]);
			}
			$del(el.previousElementSibling);
			$del(el);
		});
	}
	if(newCfg === 1) {
		forEachPost(mergeHidden);
	}
	saveCfg('delhd', newCfg);
	scriptCSS();
}

/*--------------------------Hide posts with similar text----------------------*/

function getWrds(post) {
	return post.Text
		.replace(/\s+/g, ' ')
		.replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '')
		.substring(0, 800).split(' ');
}

function findSameText(post, oNum, oVis, oWords) {
	var j,
		words = getWrds(post),
		len = words.length,
		i = oWords.length,
		olen = i,
		_olen = i,
		n = 0;
	if(len < olen*0.4 || len > olen*3) {
		return;
	}
	while(i--) {
		if(olen > 6 && oWords[i].length < 3) {
			_olen--;
			continue;
		}
		j = len;
		while(j--) {
			if(words[j] === oWords[i] || oWords[i].match(/>>\d+/) && words[j].match(/>>\d+/)) {
				n++;
			}
		}
	}
	if(n < _olen*0.4 || len > _olen*3) {
		return;
	}
	$del($c('DESU_postNote', post));
	if(oVis !== 0) {
		hidePost(post, 'similar to >>' + oNum);
	} else {
		unhidePost(post);
	}
}

function hideBySameText(post) {
	var vis = post.Vis;
	if(post.Text !== '') {
		forEachPost(function(target) {
			findSameText(target, post.Num, vis, getWrds(post));
		});
		saveHiddenPosts();
	} else {
		applySpells('#notxt');
	}
}


/*==============================================================================
								SPELLS AND EXPRESSIONS
==============================================================================*/

function getSpellObj() {
	return {
		words: [], exp: [], exph: [], img: [], imgn: [], name: [], theme: [], tmax: [],
		sage: false, notxt: false, noimg: false, trip: false
	};
}

function initSpells() {
	var i, x, b, n, t, p, j, Spells;
	pSpells = getSpellObj();
	tSpells = getSpellObj();
	oSpells = {rep: [], skip: [], num: [], outrep: [], video: []};
	for(i = 0; x = spellsList[i++];) {
		Spells = pSpells;
		x = x.toString();
		if(/^#(?:[^\s]+\/)?(?:\d+)? /.test(x)) {
			b = x.match(/^#([^\/]+)\//);
			n = x.match(/(\d+)\s/);
			if(
				TNum && b && n && b[1] === brd && n[1] === TNum
					|| TNum && !b && n && n[1] === TNum
					|| b && !n && b[1] === brd
			) {
				x = x.replace(/^#[^\s]+ /, '');
			} else {
				continue;
			}
		}
		if(/^#op /.test(x)) {
			if(!TNum) {
				Spells = tSpells;
				x = x.substr(4);
			} else {
				continue;
			}
		}
		if(!/^#/.test(x)) {
			Spells.words.push(x);
			continue;
		}
		t = x.split(' ')[0];
		p = x.replace(/^#[^\s]+ /, '');
		if(TNum && (t === '#skip' || t === '#num')) {
			p = p.split(', ');
			j = p.length;
			while(j--) {
				if(p[j].indexOf('-') < 0) {
					p[j] += '-' + p[j];
				}
				t === '#num' ? oSpells.num.push(p[j]) : oSpells.skip.push(p[j]);
			}
		}
		t === '#rep' ? oSpells.rep.push(p)
		: t === '#exp' ? Spells.exp.push(strToRegexp(p))
		: t === '#exph' ? Spells.exph.push(strToRegexp(p))
		: t === '#img' ? Spells.img.push(p)
		: t === '#imgn' ? Spells.imgn.push(strToRegexp(p))
		: t === '#name' ? Spells.name.push(p)
		: t === '#theme' ? Spells.theme.push(strToRegexp(p))
		: t === '#tmax' ? Spells.tmax.push(p)
		: t === '#sage' ? Spells.sage = true
		: t === '#notxt' ? Spells.notxt = true
		: t === '#noimg' ? Spells.noimg = true
		: t === '#trip' ? Spells.trip = true
		: t === '#outrep' ? oSpells.outrep.push(p)
		: t === '#video' && oSpells.video.push(p);
	}
}

function doReplace(arr, txt) {
	var re,
		i = arr.length;
	while(i--) {
		re = strToRegexp(arr[i]);
		txt = txt.replace(re, arr[i].substr(re.toString().length + 1));
	}
	return txt;
}

function getImgSpell(imgW, imgH, imgK, exp) {
	var s, stat, expK, x, expW, expH;
	if(exp === '') {
		return false;
	}
	s = exp.split('@');
	stat = s[0][0];
	expK = s[0].substr(1).split('-');
	if(!expK[1]) {
		expK[1] = expK[0];
	}
	if(expK[0] !== '') {
		if(
			(stat === '<' && imgK < +expK[0])
				|| (stat === '>' && imgK > +expK[0])
				|| (stat === '=' && imgK >= +expK[0] && imgK <= +expK[1])
		) {
			if(!s[1]) {
				return 'image ' + exp;
			}
		} else {
			return false;
		}
	}
	if(s[1]) {
		x = s[1].split(/[x×]/);
		expW = x[0].split('-');
		expH = x[1].split('-');
		if(!expW[1]) {
			expW[1] = expW[0];
		}
		if(!expH[1]) {
			expH[1] = expH[0];
		}
		if(
			(stat === '<' && imgW < +expW[0] && imgH < +expH[0])
				|| (stat === '>' && imgW > +expW[0] && imgH > +expH[0])
				|| (
					stat === '=' && imgW >= +expW[0] && imgW <= +expW[1]
						&& imgH >= +expH[0] && imgH <= +expH[1]
				)
		) {
			return 'image ' + exp;
		}
	}
	return false;
}

function getSpells(x, post) {
	var inf, i, t, _t, pTitle, pName, pTrip, sz, imgW, imgH, imgK;
	post.noHide = false;
	if(oSpells.skip[0] && TNum) {
		inf = post.Count + 1;
		for(i = 0; t = oSpells.skip[i++];) {
			t = t.split('-');
			if(inf >= +t[0] && inf <= +t[1]) {
				post.noHide = true;
				return false;
			}
		}
	}
	if(x.words[0] || x.theme[0]) {
		pTitle = $c('replytitle', post) || $c('filetitle', post);
		pTitle = pTitle ? pTitle.textContent.toLowerCase() : '';
	}
	if(x.words[0]) {
		for(i = 0, inf = post.Text.toLowerCase(); t = x.words[i++];) {
			_t = t;
			t = t.toLowerCase();
			if(inf.indexOf(t) >= 0 || pTitle.indexOf(t) >= 0) {
				return _t;
			}
		}
	}
	if(x.theme[0]) {
		for(i = 0; t = x.theme[i++];) {
			if(t.test(pTitle)) {
				return '#theme ' + t.toString();
			}
		}
	}
	if(x.exp[0]) {
		for(i = 0, inf = post.Text; t = x.exp[i++];) {
			if(t.test(inf)) {
				return '#exp ' + t.toString();
			}
		}
	}
	if(x.exph[0]) {
		for(i = 0, inf = post.innerHTML; t = x.exph[i++];) {
			if(t.test(inf)) {
				return '#exph ' + t.toString();
			}
		}
	}
	if(x.name[0] || x.trip) {
		pName = $c('commentpostername', post) || $c('postername', post);
		pTrip = $c('postertrip', post);
	}
	if(x.trip && pTrip) {
		return '#trip';
	}
	if(x.name[0]) {
		pName = pName ? pName.textContent : '';
		pTrip = pTrip ? pTrip.textContent : '';
		for(i = 0; t = x.name[i++];) {
			_t = t;
			t = t.split(/!+/);
			if(t[0] !== '' && pName.indexOf(t[0]) >= 0 || t[1] !== '' && pTrip.indexOf(t[1]) >= 0) {
				return '#name ' + _t;
			}
		}
	}
	if(post.Img.snapshotLength > 0) {
		if(x.img[0]) {
			sz = getImgSize(post);
			imgW = +sz[0];
			imgH = +sz[1];
			imgK = getImgWeight(post);
			for(i = 0; t = x.img[i++];) {
				if(getImgSpell(imgW, imgH, imgK, t)) {
					return '#img ' + t;
				}
			}
		}
		if(x.imgn[0]) {
			inf = aib.getImgInfo(post);
			if(inf) {
				for(i = 0, inf = inf.textContent; t = x.imgn[i++];) {
					if(t.test(inf)) {
						return '#imgn ' + t;
					}
				}
			}
		}
	}
	if(oSpells.num[0]) {
		for(i = 0, inf = post.Count + 1; t = oSpells.num[i++];) {
			_t = t;
			t = t.split('-');
			if(inf >= +t[0] && inf <= +t[1]) {
				return '#num ' + _t;
			}
		}
	}
	if(x.tmax[0]) {
		for(i = 0, inf = post.Text.replace(/\n/g, '').length; t = x.tmax[i++];) {
			if(inf >= t) {
				return '#tmax ' + t;
			}
		}
	}
	if(x.sage && aib.getSage(post)) {
		return '#sage';
	}
	if(x.notxt && post.Text === '') {
		return '#no text';
	}
	if(x.noimg && post.Img.snapshotLength === 0) {
		return '#no image';
	}
	return false;
}

function checkSpells(post) {
	if(!TNum && post.isOp) {
		return getSpells(tSpells, post) || getSpells(pSpells, post);
	}
	return getSpells(pSpells, post);
}

function hideBySpells(post) {
	var exp;
	if(Cfg['filthr'] === 0 && post.isOp) {
		return;
	}
	exp = checkSpells(post);
	if(post.Vis === 0) {
		if(post.noHide) {
			unhidePost(post);
		}
	} else if(exp) {
		hidePost(post, exp.substring(0, 70));
	}
}

function verifyRegExp(txt) {
	var i, t, rep,
		re = /#exp |#exph |#rep |#outrep |#imgn |#video |#theme /;
	txt = txt.split('\n');
	i = txt.length;
	while(i--) {
		t = txt[i];
		rep = t.match(re);
		if(rep) {
			try {
				strToRegexp(t.substr(t.indexOf(rep)));
			} catch(e) {
				return t;
			}
		}
	}
	return false;
}

function toggleSpells() {
	var fld = $id('DESU_spellEdit'),
		val = (fld ? fld.value : spellsList.join('\n'))
			.replace(/[\r\n]+/g, '\n')
			.replace(/^\n|\n$/g, ''),
		wrong = verifyRegExp(val);
	if(!wrong) {
		saveSpells(val);
	}
	if(val !== '' && !wrong) {
		if(fld) {
			fld.value = val;
		}
		if(Cfg['spells'] !== 0) {
			forEachPost(hideBySpells);
			hideTextTube();
		} else {
			unHideTextTube();
			forEachPost(function(post) {
				if(checkSpells(post)) {
					unhidePost(post);
				}
			})
		}
		saveHiddenPosts();
	} else {
		if(wrong) {
			$alert(Lng.error[lCode] + ' ' + wrong, 'ErrSpell', false);
		}
		if(fld) {
			$id('DESU_spellChk').checked = false;
		}
		saveCfg('spells', 0);
	}
}

function applySpells(txt) {
	var nval, ntxt, wrong,
		fld = $id('DESU_spellEdit'),
		val = fld ? fld.value : spellsList.join('\n');
	if(txt !== '') {
		if(txt.trim() === '') {
			return;
		}
		if(TNum) {
			txt = '#' + brd + '/' + TNum + ' ' + txt;
		}
		toggleSpells();
		nval = '\n' + val;
		ntxt = '\n' + txt;
		val = nval.indexOf(ntxt) >= 0 ? nval.split(ntxt).join('') : val + ntxt;
	}
	val = val.replace(/[\r\n]+/g, '\n').replace(/^\n|\n$/g, '');
	wrong = verifyRegExp(val);
	if(wrong) {
		$alert(Lng.error[lCode] + ' ' + wrong, 'ErrSpell', false);
		return;
	}
	if(fld) {
		fld.value = val;
		$id('DESU_spellChk').checked = val !== '';
	}
	forEachPost(function(post) {
		if(checkSpells(post)) {
			unhidePost(post);
		}
	})
	unHideTextTube();
	saveSpells(val);
	if(val !== '') {
		saveCfg('spells', 1);
		forEachPost(hideBySpells);
		hideTextTube();
	} else {
		saveCfg('spells', 0);
	}
	saveHiddenPosts();
}


/*==============================================================================
									WIPE DETECTORS
==============================================================================*/

function detectWipe_sameLines(txt) {
	var lines, i, x,
		arr = [],
		n = 0;
	if(Cfg['samel'] === 0) {
		return false;
	}
	lines = txt.replace(/> /g, '').split(/\s*\n\s*/);
	i = lines.length;
	if(i < 6) {
		return false;
	}
	while(i--) {
		x = lines[i];
		if(x.length === 0) {
			continue;
		}
		if(arr[x]) {
			arr[x]++;
		} else {
			arr[x] = 1;
		}
		n++;
	}
	n = n/4;
	for(x in arr) {
		if(arr[x] > n && arr[x] > 4) {
			return 'same lines: "' + x.substr(0, 20) + '" x' + (arr[x] + 1);
		}
	}
	return false;
}

function detectWipe_sameWords(txt) {
	var words, i, x,
		arr = [],
		n = 0,
		keys = 0,
		pop = '',
		mpop = -1;
	if(Cfg['samew'] === 0) {
		return false;
	}
	words = txt.replace(/[\s\.\?\!,>]+/g, ' ').toUpperCase().split(' ');
	i = words.length;
	if(i <= 13) {
		return false;
	}
	while(i--) {
		x = words[i];
		if(x.length < 2) {
			continue;
		}
		if(arr[x]) {
			arr[x]++;
		} else {
			arr[x] = 1;
		}
		n++;
	}
	if(n < 10) {
		return false;
	}
	for(x in arr) {
		keys++;
		if(arr[x] > mpop) {
			mpop = arr[x];
			pop = x;
		}
		if(n > 25 && arr[x] > n/3.5) {
			return 'same words: "' + x.substr(0, 20) + '" x' + arr[x];
		}
	}
	return n > 80 && keys <= 20 || n/keys > 7
		? 'same words: "' + pop.substr(0, 20) + '" x' + mpop
		: false;
}

function detectWipe_longColumn(txt) {
	var rows, i,
		n = 0;
	if(Cfg['longp'] === 0) {
		return false;
	}
	rows = txt.split(/\s*\n\s*/);
	i = rows.length;
	if(i > 50) {
		return 'long text x' + i;
	}
	while(i--) {
		if(rows[i].length < 9) {
			n++;
		} else {
			return false;
		}
	}
	return n > 5 ? 'columns x' + n : false;
}

function detectWipe_longWords(txt) {
	var words, i, x,
		all = '',
		longest = '',
		n = 0;
	if(Cfg['longw'] === 0) {
		return false;
	}
	words = txt.replace(/https*:\/\/.*?(\s|$)/g, '').replace(/[\s\.\?!,>:;-]+/g, ' ').split(' ');
	i = words.length;
	while(i--) {
		x = words[i];
		if(x.length < 2) {
			continue;
		}
		all += x;
		longest = x.length > longest.length ? x : longest;
		n++;
	}
	return n === 1 && longest.length > 70 || n > 1 && all.length/n > 12
		? 'long words: "' + longest.substr(0, 20) + '.."'
		: false;
}

function detectWipe_caseWords(txt) {
	var words, i, x,
		capsw = 0,
		casew = 0,
		n = 0;
	if(Cfg['caps'] === 0) {
		return false;
	}
	words = txt.replace(/[\s\.\?!;,-]+/g, ' ').trim().split(' ');
	if(words.length < 5) {
		return false;
	}
	for(i = 0; x = words[i++];) {
		if((x.match(/[a-zа-я]/ig) || []).length < 5) {
			continue;
		}
		if((x.match(/[A-ZА-Я]/g) || []).length > 2) {
			casew++;
		}
		if(x === x.toUpperCase()) {
			capsw++;
		}
		n++;
	}
	return (capsw/n >= 0.3 && n > 4) ? ('CAPSLOCK: ' + parseInt(capsw/words.length*100, 10) + '%')
		: (casew/n >= 0.3 && n > 8) ? ('cAsE words: ' + parseInt(casew/words.length*100, 10) + '%')
		: false;
}

function detectWipe_specSymbols(txt) {
	var len, proc;
	if(Cfg['specs'] === 0) {
		return false;
	}
	txt = txt.replace(/\s+/g, '');
	len = txt.length;
	proc = txt.replace(/[0-9a-zа-я\.\?!,]/ig, '').length/len;
	return len > 30 && proc > 0.4 ? 'specsymbols: ' + parseInt(proc*100, 10) + '%' : false;
}

function detectWipe_numbers(txt) {
	var len, proc;
	if(Cfg['nums'] === 0) {
		return false;
	}
	txt = txt.replace(/\s+/g, ' ').replace(/((>>\d+)+|https*:\/\/.*?)(\s|$)/g, '');
	len = txt.length;
	proc = (len - txt.replace(/\d/g, '').length)/len;
	return len > 30 && proc > 0.4 ? 'numbers: ' + parseInt(proc*100, 10) + '%' : false;
}

function detectWipe(post) {
	var arr, i, x;
	if(Cfg['awipe'] === 0) {
		return false;
	}
	arr = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_caseWords,
		detectWipe_specSymbols,
		detectWipe_numbers
	];
	for(i = 0; i < 7; i++) {
		x = arr[i](post.Text);
		if(x) {
			return x;
		}
	}
	return false;
}

function hideByWipe(post) {
	var note;
	if(Cfg['filthr'] === 0 && post.isOp || post.Vis === 0 || post.Vis === 1) {
		return;
	}
	note = detectWipe(post);
	if(note) {
		hidePost(post, note);
	} else {
		applyPostVisib(post, 1, false);
	}
}


/*==============================================================================
									SCRIPT CSS
==============================================================================*/

function scriptCSS() {
	var x = [], p,
		gif = function(name, src) {
			x.push(name + ' { background: url(data:image/gif;base64,' + src + ') no-repeat center !important; }');
		},
		cont = function(name, src) {
			x.push(name + ':before { content: ""; padding: 0 16px 0 0; margin: 0 4px; background: url(' + src + ') no-repeat center; }');
		};

	// Settings window
	x.push(
		'#DESU_cfgWindow { float: left; ' + nav.cFix + 'border-radius: 10px 10px 0 0; width: auto; min-width: 0; padding: 0; margin: 5px 20px; overflow: hidden; }\
		#DESU_cfgHead { padding: 5px; ' + nav.cFix + 'border-radius: 10px 10px 0 0; color: #fff; text-align: center; font: bold 14px arial; cursor: default; }\
		#DESU_cfgHead:lang(en), #DESU_panel:lang(en) { background: ' + nav.aCFix + 'linear-gradient(top, #4b90df 0%, #3d77be 20%, #376cb0 25%, #295591 50%, #183d77 50%, #1f4485 75%, #264c90 85%, #325f9e 100%); }\
		#DESU_cfgHead:lang(ru), #DESU_panel:lang(ru) { background: url("data:image/gif;base64,R0lGODlhAQAZAMQAABkqTSRDeRsxWBcoRh48axw4ZChOixs0Xi1WlihMhRkuUQwWJiBBcSpTkS9bmxAfNSdKgDJfoQ0YKRElQQ4bLRAjOgsWIg4fMQsVHgAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAQAZAEAFFWDETJghUAhUAM/iNElAHMpQXZIVAgA7"); }\
		#DESU_cfgHead:lang(de), #DESU_panel:lang(de) { background: #777; }\
		.DESU_cfgBody { min-width: 371px; min-height: 280px; padding: 11px 7px 7px; margin-top: -1px; font: 13px sans-serif; }\
		.DESU_cfgBody input[type="text"] { width: auto; }\
		.DESU_cfgBody input[value=">"] { width: 20px; }\
		.DESU_cfgBody, #DESU_cfgBtns { border: 1px solid #183d77; border-top: none; }\
		.DESU_cfgBody:lang(de), #DESU_cfgBtns:lang(de) { border-color: #444; }\
		#DESU_cfgBtns { padding: 7px 2px 2px; }\
		#DESU_cfgBar { height: 25px; width: 100%; display: table; background-color: #325f9e; }\
		#DESU_cfgBar:lang(ru) { background-color: #0c1626; }\
		#DESU_cfgBar:lang(de) { background-color: #777; }\
		.DESU_cfgTab, .DESU_cfgTab_sel { padding: 4px 6px; border: 1px solid #183d77; ' + nav.cFix + 'border-radius: 4px 4px 0 0; font: bold 14px arial; text-align: center; cursor: default; }\
		.DESU_cfgTab:lang(de), .DESU_cfgTab_sel:lang(de) { border-color: #444; }\
		.DESU_cfgTab { background-color: rgba(0,0,0,.2); }\
		.DESU_cfgTab:lang(en) { background: ' + nav.aCFix + 'linear-gradient(top, rgba(132,132,132,.35) 0%, rgba(110,110,110,.35) 20%, rgba(100,100,100,.35) 25%, rgba(79,79,79,.35) 50%, rgba(58,58,58,.35) 50%, rgba(68,68,68,.35) 75%, rgba(74,74,74,.35) 85%, rgba(90,90,90,.35) 100%); }\
		.DESU_cfgTab:hover { background-color: rgba(99,99,99,.2); }\
		.DESU_cfgTab:hover:lang(en) { background: ' + nav.aCFix + 'linear-gradient(top, rgba(90,90,90,.35) 0%, rgba(74,74,74,.35) 15%, rgba(68,68,68,.35) 25%, rgba(58,58,58,.35) 50%, rgba(79,79,79,.35) 50%, rgba(100,100,100,.35) 75%, rgba(110,110,110,.35) 80%, rgba(132,132,132,.35) 100%); }\
		.DESU_cfgTab_sel { border-bottom: none; }\
		.DESU_cfgTabBack { display: table-cell !important; float: none !important; min-width: 0; padding: 0 !important; ' + nav.cFix + 'box-shadow: none !important; border: none !important; ' + nav.cFix + 'border-radius: 4px 4px 0 0; opacity: 1; }\
		#DESU_spellPanel { float: right; }\
		#DESU_spellPanel > a { padding: 0 7px; text-align: center; }'
	);

	// Main panel
	x.push(
		'#DESU_btnLogo { margin-right: 3px; }\
		#DESU_panel { ' + (Cfg['attach'] === 0 ? 'float: right;' : 'position: fixed; right: 0; bottom: 0;') + ' height: 25px; z-index: 9999; ' + nav.cFix + 'border-radius: 15px 0 0 0; cursor: default;}\
		#DESU_panelBtns { display: inline-block; padding: 0 2px; margin: 0; height: 25px; border-left: 1px solid #8fbbed; }\
		#DESU_panelBtns:lang(ru) { border-color: #79c; }\
		#DESU_panelBtns:lang(de) { border-color: #ccc; }\
		#DESU_panelBtns > li { margin: 0 1px; }\
		#DESU_panelBtns > li, #DESU_panelBtns > li > a, #DESU_btnLogo { display: inline-block; width: 25px; height: 25px; }\
		#DESU_panelBtns:lang(en) > li { ' + nav.aCFix + 'transition: all 0.3s ease; }\
		#DESU_panelBtns:lang(en) > li:hover { background-color: rgba(255,255,255,.15); ' + nav.cFix + 'box-shadow: 0 0 3px rgba(143,187,237,.5); }\
		#DESU_panelBtns:lang(ru) > li > a, #DESU_panelBtns:lang(de) > li > a { ' + nav.cFix + 'border-radius: 5px; }\
		#DESU_panelBtns:lang(ru) > li > a:hover { width: 21px; height: 21px; border: 2px solid #9be; }\
		#DESU_panelBtns:lang(de) > li > a:hover { width: 21px; height: 21px; border: 2px solid #444; }\
		#DESU_panelInfo { display: inline-block; vertical-align: top; padding: 0 6px; height: 25px; border-left: 1px solid #8fbbed; color: #fff; font: 18px serif; }\
		#DESU_panelInfo:lang(en) { border-color: #79c; }\
		#DESU_panelInfo:lang(de) { border-color: #ccc; }'
	);
	if(Cfg['icount'] === 0) {
		x.push('#DESU_panelInfo { display: none; }');
	}
	if(Cfg['showmp'] === 0) {
		x.push('#DESU_panelBtns, #DESU_panelInfo { display: none; }');
	}
	p = 'R0lGODlhGQAZAIAAAPDw8P///yH5BAEAAAEALAAAAAAZABkAQA';
	gif('#DESU_btnLogo', p + 'I5jI+pywEPWoIIRomz3tN6K30ixZXM+HCgtjpk1rbmTNc0erHvLOt4vvj1KqnD8FQ0HIPCpbIJtB0KADs=');
	gif('#DESU_btnSettings', p + 'JAjI+pa+API0Mv1Ymz3hYuiQHHFYjcOZmlM3Jkw4aeAn7R/aL6zuu5VpH8aMJaKtZR2ZBEZnMJLM5kIqnP2csUAAA7');
	gif('#DESU_btnHidden', p + 'I5jI+pa+CeHmRHgmCp3rxvO3WhMnomUqIXl2UmuLJSNJ/2jed4Tad96JLBbsEXLPbhFRc8lU8HTRQAADs=');
	gif('#DESU_btnFavor', p + 'IzjI+py+AMjZs02ovzobzb1wDaeIkkwp3dpLEoeMbynJmzG6fYysNh3+IFWbqPb3OkKRUFADs=');
	gif('#DESU_btnRefresh', p + 'JAjI+pe+AfHmRGLkuz3rzN+1HS2JWbhWlpVIXJ+roxSpr2jedOBIu0rKjxhEFgawcCqJBFZlPJIA6d0ZH01MtRCgA7');
	gif('#DESU_btnGoBack', p + 'IrjI+pmwAMm4u02gud3lzjD4biJgbd6VVPybbua61lGqIoY98ZPcvwD4QUAAA7');
	gif('#DESU_btnGoNext', p + 'IrjI+pywjQonuy2iuf3lzjD4Zis0Xd6YnQyLbua61tSqJnbXcqHVLwD0QUAAA7');
	gif('#DESU_btnGoUp', p + 'IsjI+pm+DvmDRw2ouzrbq9DmKcBpVfN4ZpyLYuCbgmaK7iydpw1OqZf+O9LgUAOw==');
	gif('#DESU_btnGoDown', p + 'ItjI+pu+DA4ps02osznrq9DnZceIxkYILUd7bue6WhrLInLdokHq96tnI5YJoCADs=');
	gif('#DESU_btnNewThr', p + 'IyjI+pG+APQYMsWsuy3rzeLy2g05XcGJqqgmJiS63yTHtgLaPTY8Np4uO9gj0YbqM7bgoAOw==');
	gif('#DESU_btnExpImg', p + 'I9jI+pGwDn4GPL2Wep3rxXFEFel42mBE6kcYXqFqYnVc72jTPtS/KNr5OJOJMdq4diAXWvS065NNVwseehAAA7');
	gif('#DESU_btnMaskImg', p + 'JQjI+pGwD3TGxtJgezrKz7DzLYRlKj4qTqmoYuysbtgk02ZCG1Rkk53gvafq+i8QiSxTozIY7IcZJOl9PNBx1de1Sdldeslq7dJ9gsUq6QnwIAOw==');
	if(aib.nul) {
		gif('#DESU_btnCatalog', p + 'I2jI+pa+DhAHyRNYpltbz7j1Rixo0aCaaJOZ2SxbIwKTMxqub6zuu32wP9WsHPcFMs0XDJ5qEAADs=');
	}
	p = 'Dw8P///wAAACH5BAEAAAIALAAAAAAZABkAQAJElI+pe2EBoxOTNYmr3bz7OwHiCDzQh6bq06QSCUhcZMCmNrfrzvf+XsF1MpjhCSainBg0AbKkFCJko6g0MSGyftwuowAAOw==';
	gif('#DESU_btnUpdOn', 'R0lGODlhGQAZAJEAADL/Mv' + p);
	gif('#DESU_btnUpdOff', 'R0lGODlhGQAZAJEAAP8yMv' + p);
	gif('#DESU_btnUpdWarn', 'R0lGODlhGQAZAJEAAP/0Qf' + p);

	// Post buttons
	x.push(
		'.DESU_btnHide, .DESU_btnUnhide, .DESU_btnRep, .DESU_btnExpthr, .DESU_btnFav, .DESU_btnFavSel, .DESU_btnSage, .DESU_btnSrc\
			{ display: inline-block; padding: 0 14px 14px 0; margin: 0 4px -2px 0 !important; cursor: pointer; }\
		.DESU_postPanel, .DESU_postPanel_op, .DESU_postPanel_del { margin-left: 4px; font-weight: bold; }'
	);
	p = 'R0lGODlhDgAOAKIAAPDw8KCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM';
	gif('.DESU_btnHide', p + '8SLLcS2MNQGsUMYi6uB5BKI5hFgojel5YBbDDNcmvpJLkcgLq1jcuSgPmgkUmlJgFAyqNmoEBJEatxggJADs=');
	gif('.DESU_btnUnhide', p + '5SLLcS2ONCcCMIoYdRBVcN4Qkp4ULmWVV20ZTM1SYBJbqvXmA3jk8IMzlgtVYFtkoNCENIJdolJAAADs=');
	gif('.DESU_btnRep', p + '4SLLcS2MNQGsUMQRRwdLbAI5kpn1kKHUWdk3AcDFmOqKcJ5AOq0srX0QWpBAlIo3MNoDInlAZIQEAOw==');
	gif('.DESU_btnExpthr', p + '7SLLcS6MNACKLIQjKgcjCkI2DOAbYuHlnKFHWUl5dnKpfm2vd7iyUXywEk1gmnYrMlEEyUZCSdFoiJAAAOw==');
	gif('.DESU_btnFav', p + '5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_btnFavSel', 'R0lGODlhDgAOAKIAAP/hAKCgoICAgEtLS////wAAAAAAAAAAACH5BAEAAAQALAAAAAAOAA4AQAM5SLLcS2MNQGsUl1XgRvhg+EWhQAllNG0WplLXqqIlDS7lWZvsJkm92Au2Aqg8gQFyhBxAlNCokpAAADs=');
	gif('.DESU_btnSage', 'R0lGODlhDgAOAJEAAPDw8EtLS////wAAACH5BAEAAAIALAAAAAAOAA4AQAIZVI55duDvFIKy2vluoJfrD4Yi5lWRwmhCAQA7');

	// Search images buttons
	gif('.DESU_btnSrc', p + '9SLLcS0MMQMesUoQg6PKbtFnDaI0a53VAml2ARcVSFC0WY6ecyy+hFajnWDVssyQtB5NhTs1mYAAhWa2EBAA7');
	cont('.DESU_srcGoogle', '//google.ru/favicon.ico');
	cont('.DESU_srcTineye', '//tineye.com/favicon.ico');
	cont('.DESU_srcIqdb', '//iqdb.org/favicon.ico');
	cont('.DESU_srcSaucenao', '//saucenao.com/favicon.ico');

	// Posts counter
	if(TNum) x.push(
		'.DESU_thread { counter-reset: i 1; }\
		.DESU_postPanel:after { counter-increment: i 1; content: counter(i, decimal); vertical-align: 1px; color: #4f7942; font: italic bold 13px serif; cursor: default; }\
		.DESU_postPanel_del:after { content: "' + Lng.deleted[lCode] + '"; color: #727579; font: italic bold 13px serif; cursor: default; }'
	);

	// text format buttons
	x.push('#DESU_txtPanel { ' + (Cfg['txtpos'] === 0 ? 'float: right;' : '') + ' display: block; height: 23px; font-weight: bold; cursor: pointer; }');
	if(Cfg['txtbtn'] === 1) {
		x.push('#DESU_txtPanel span { display: inline-block; width: 27px; height: 23px }');
		p = 'R0lGODlhFwAWAJEAAPDw8GRkZAAAAP///yH5BAEAAAMALAAAAAAXABYAQAJ';
		gif('#DESU_btnBold', p + 'T3IKpq4YAoZgR0KqqnfzipIUikFWc6ZHBwbQtG4zyonW2Vkb2iYOo8Ps8ZLOV69gYEkU5yQ7YUzqhzmgsOLXWnlRIc9PleX06rnbJ/KITDqTLUAAAOw==');
		gif('#DESU_btnItalic', p + 'K3IKpq4YAYxRCSmUhzTfx3z3c9iEHg6JnAJYYSFpvRlXcLNUg3srBmgr+RL0MzxILsYpGzyepfEIjR43t5kResUQmtdpKOIQpQwEAOw==');
		gif('#DESU_btnUnder', p + 'V3IKpq4YAoRARzAoV3hzoDnoJNlGSWSEHw7JrEHILiVp1NlZXtKe5XiptPrFh4NVKHh9FI5NX60WIJ6ATZoVeaVnf8xSU4r7NMRYcFk6pzYRD2TIUAAA7');
		gif('#DESU_btnStrike', p + 'S3IKpq4YAoRBR0qqqnVeD7IUaKHIecjCqmgbiu3jcfCbAjOfTZ0fmVnu8YIHW6lgUDkOkCo7Z8+2AmCiVqHTSgi6pZlrN3nJQ8TISO4cdyJWhAAA7');
		gif('#DESU_btnSpoil', 'R0lGODlhFwAWAJEAAPDw8GRkZP///wAAACH5BAEAAAIALAAAAAAXABYAQAJBlIKpq4YAmHwxwYtzVrprXk0LhBziGZiBx44hur4kTIGsZ99fSk+mjrMAd7XerEg7xnpLIVM5JMaiFxc14WBiBQUAOw==');
		gif('#DESU_btnCode', p + 'O3IKpq4YAoZgR0KpqnFxokH2iFm7eGCEHw7JrgI6L2F1YotloKek6iIvJAq+WkfgQinjKVLBS45CePSXzt6RaTjHmNjpNNm9aq6p4XBgKADs=');
		gif('#DESU_btnQuote', p + 'L3IKpq4YAYxRUSKguvRzkDkZfWFlicDCqmgYhuGjVO74zlnQlnL98uwqiHr5ODbDxHSE7Y490wxF90eUkepoysRxrMVaUJBzClaEAADs=');
	}

	// Show/close animation
	if(nav.Anim) {
		x.push(
			'@' + nav.aCFix + 'keyframes DESU_aOpen {\
				0% { ' + nav.aCFix + 'transform: translateY(-1500px); }\
				40% { ' + nav.aCFix + 'transform: translateY(30px); }\
				70% { ' + nav.aCFix + 'transform: translateY(-10px); }\
				100% { ' + nav.aCFix + 'transform: translateY(0); }\
			}\
			@' + nav.aCFix + 'keyframes DESU_aClose {\
				0% { ' + nav.aCFix + 'transform: translateY(0); }\
				20% { ' + nav.aCFix + 'transform: translateY(20px); }\
				100% { ' + nav.aCFix + 'transform: translateY(-4000px); }\
			}\
			@' + nav.aCFix + 'keyframes DESU_aBlink {\
				0%, 100% { ' + nav.aCFix + 'transform: translateX(0); }\
				10%, 30%, 50%, 70%, 90% { ' + nav.aCFix + 'transform: translateX(-10px); }\
				20%, 40%, 60%, 80% { ' + nav.aCFix + 'transform: translateX(10px); }\
			}\
			@' + nav.aCFix + 'keyframes DESU_cfgOpen { from { ' + nav.aCFix + 'transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_cfgClose { to { ' + nav.aCFix + 'transform: translate(0,50%) scaleY(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenTL { from { ' + nav.aCFix + 'transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenBL { from { ' + nav.aCFix + 'transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenTR { from { ' + nav.aCFix + 'transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pOpenBR { from { ' + nav.aCFix + 'transform: translate(50%,50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseTL { to { ' + nav.aCFix + 'transform: translate(-50%,-50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseBL { to { ' + nav.aCFix + 'transform: translate(-50%,50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseTR { to { ' + nav.aCFix + 'transform: translate(50%,-50%) scale(0); opacity: 0; } }\
			@' + nav.aCFix + 'keyframes DESU_pCloseBR { to { ' + nav.aCFix + 'transform: translate(50%,50%) scale(0); opacity: 0; } }\
			.DESU_pView { ' + nav.aCFix + 'animation-duration: .2s; ' + nav.aCFix + 'animation-timing-function: ease-in-out; ' + nav.aCFix + 'animation-fill-mode: both; }\
			.DESU_aOpen { ' + nav.aCFix + 'animation: DESU_aOpen .7s ease-out both; }\
			.DESU_aClose { ' + nav.aCFix + 'animation: DESU_aClose .7s ease-in both; }\
			.DESU_aBlink { ' + nav.aCFix + 'animation: DESU_aBlink .7s ease-in-out both; }\
			.DESU_cfgOpen { ' + nav.aCFix + 'animation: DESU_cfgOpen .2s ease-out backwards; }\
			.DESU_cfgClose { ' + nav.aCFix + 'animation: DESU_cfgClose .2s ease-in both; }'
		);
	}

	// Embedders
	cont('.DESU_ytLink', '//youtube.com/favicon.ico');
	x.push(
		'.DESU_preImg, .DESU_fullImg { display: block; margin: ' + (aib.krau ? 0 : '2px 10px') + '; border: none; outline: none; cursor: pointer; }\
		.DESU_mp3, .DESU_ytObj { margin: 5px 20px; }\
		.DESU_post > a + .DESU_mp3, .DESU_post > a + .DESU_ytObj { display: inline-block; }\
		.DESU_ytObj > img { cursor: pointer; }'
	);
	if(Cfg['mask'] !== 0) {
		x.push(
			'.DESU_preImg, .DESU_ytObj, img[src*="spoiler"], img[src*="thumb"] { opacity: 0.07 !important; }\
			.DESU_preImg:hover, .DESU_ytObj:hover, img[src*="spoiler"]:hover, img[src*="thumb"]:hover { opacity: 1 !important; }'
		);
	}

	// Other
	cont('.DESU_wait', 'data:image/gif;base64,R0lGODlhEAAQALMMAKqooJGOhp2bk7e1rZ2bkre1rJCPhqqon8PBudDOxXd1bISCef///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAMACwAAAAAEAAQAAAET5DJyYyhmAZ7sxQEs1nMsmACGJKmSaVEOLXnK1PuBADepCiMg/DQ+/2GRI8RKOxJfpTCIJNIYArS6aRajWYZCASDa41Ow+Fx2YMWOyfpTAQAIfkEBQAADAAsAAAAABAAEAAABE6QyckEoZgKe7MEQMUxhoEd6FFdQWlOqTq15SlT9VQM3rQsjMKO5/n9hANixgjc9SQ/CgKRUSgw0ynFapVmGYkEg3v1gsPibg8tfk7CnggAIfkEBQAADAAsAAAAABAAEAAABE2QycnOoZjaA/IsRWV1goCBoMiUJTW8A0XMBPZmM4Ug3hQEjN2uZygahDyP0RBMEpmTRCKzWGCkUkq1SsFOFQrG1tr9gsPc3jnco4A9EQAh+QQFAAAMACwAAAAAEAAQAAAETpDJyUqhmFqbJ0LMIA7McWDfF5LmAVApOLUvLFMmlSTdJAiM3a73+wl5HYKSEET2lBSFIhMIYKRSimFriGIZiwWD2/WCw+Jt7xxeU9qZCAAh+QQFAAAMACwAAAAAEAAQAAAETZDJyRCimFqbZ0rVxgwF9n3hSJbeSQ2rCWIkpSjddBzMfee7nQ/XCfJ+OQYAQFksMgQBxumkEKLSCfVpMDCugqyW2w18xZmuwZycdDsRACH5BAUAAAwALAAAAAAQABAAAARNkMnJUqKYWpunUtXGIAj2feFIlt5JrWybkdSydNNQMLaND7pC79YBFnY+HENHMRgyhwPGaQhQotGm00oQMLBSLYPQ9QIASrLAq5x0OxEAIfkEBQAADAAsAAAAABAAEAAABE2QycmUopham+da1cYkCfZ94UiW3kmtbJuRlGF0E4Iwto3rut6tA9wFAjiJjkIgZAYDTLNJgUIpgqyAcTgwCuACJssAdL3gpLmbpLAzEQA7');
	x.push(
		'.DESU_alertBtn { display: inline-block; vertical-align: top; font-size: 150%; color: green; cursor: pointer; }\
		.DESU_alertMsg { display: inline-block; margin-top: .25em; }\
		#DESU_alertBox { position: fixed; right: 0; top: 0; z-index: 9999; font: 14px arial; cursor: default; }\
		#DESU_alertBox > div { float: right; clear: both; width: auto; min-width: 0pt; padding: 10px; margin: 1px; border: 1px solid grey; white-space: pre-wrap; }\
		#DESU_cfgEdit, #DESU_favEdit, #DESU_hidTEdit, #DESU_spellEdit { display: block; margin: 2px 0; font: 12px courier new; }\
		.DESU_content { ' + (Cfg['attach'] === 0 ? 'width: 100%;' : 'position: fixed; right: 0; bottom: 25px; z-index: 9999; max-height: 95%; overflow: auto;') + ' text-align: left; }\
		.DESU_content > table { ' + (Cfg['attach'] === 0 ? 'margin: 5px 20px; font-size: 16px;' : 'padding: 5px 10px; border: 1px solid grey; font-size: 16px;') + ' }\
		.DESU_favData .DESU_thread { padding-left: 15px; border: 1px solid grey; }\
		.DESU_favData a, .DESU_hidTData a { text-decoration: none; }\
		.DESU_favHead a { color: inherit; font-weight: bold; }\
		.DESU_favPCount { float: right; margin: 0 5px 0 15px; font: bold 16px serif; }\
		.DESU_favPCount span { color: #4f7942; }\
		#DESU_iframe { display: none; width: 0px; height: 0px; border: none; }\
		.DESU_omitted { color: grey; font-style: italic; }\
		.DESU_postNote { color: inherit; font-size: 12px; font-style: italic; }\
		#DESU_qarea { float: none; clear: left; width: 100%; padding: 3px 0 3px 3px; margin: 2px 0; }\
		.DESU_refHid { text-decoration: line-through !important; }\
		.DESU_refMap { margin: 10px 4px 4px 4px; font-size: 70%; font-style: italic; }\
		.DESU_refMap:before { content: "' + Lng.replies[lCode] + ' "; }\
		.DESU_refMap > a { text-decoration: none; }\
		#DESU_sageBtn { cursor: pointer; }\
		#DESU_select { padding: 0 !important; margin: 0 !important; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey;}\
		#DESU_select a { display: block; padding: 3px 10px; color: inherit; text-decoration: none; font: 13px arial; white-space: nowrap; }\
		#DESU_select a:hover { background-color: ' + (Cfg['sstyle'] === 2 ? '#444' : '#1b345e') + '; color: #fff; }\
		.DESU_selected { ' + (nav.Opera ? 'border-left: 4px solid red; border-right: 4px solid red; }' : nav.cFix + 'box-shadow: 6px 0 2px -2px red, -6px 0 2px -2px red; }') + '\
		#DESU_txtResizer { display: inline-block !important; float: none !important; padding: 5px; margin: 0 0 -' + (nav.Opera ? 8 : nav.Chrome ? 2 : 3) + 'px -12px; border-bottom: 2px solid #555; border-right: 2px solid #444; cursor: se-resize; }\
		.DESU_viewed { color: #888 !important; }\
		.DESU_post { width: auto; }\
		.DESU_aBtn { text-decoration: none !important; outline: none; }\
		.DESU_pPost { font-weight: bold; }\
		.DESU_info { padding: 3px 6px !important; }\
		.DESU_pView { position: absolute; width: auto; min-width: 0; z-index: 9999; border: 1px solid grey; }\
		.DESU_cFullImg { position: fixed; z-index: 9999; border: 1px solid black; }\
		.DESU_archive:after { content: ""; padding: 0 16px 3px 0; margin: 0 4px; background: url(data:image/gif;base64,R0lGODlhEAAQALMAAF82SsxdwQMEP6+zzRA872NmZQesBylPHYBBHP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAQARTMMlJaxqjiL2L51sGjCOCkGiBGWyLtC0KmPIoqUOg78i+ZwOCUOgpDIW3g3KJWC4t0ElBRqtdMr6AKRsA1qYy3JGgMR4xGpAAoRYkVDDWKx6NRgAAOw==) no-repeat center; }\
		small[id^="rfmap"], div[id^="preview"], div[id^="pstprev"] { display: none !important; }\
		textarea { resize: none !important; }'
	);
	if(Cfg['delhd'] === 2) {
		x.push('div[id^=DESU_hidThr_], div[id^=DESU_hidThr_] + div + br, div[id^=DESU_hidThr_] + div + br + hr { display: none; }');
	}
	if(Cfg['noname'] !== 0) {
		x.push('.commentpostername, .postername, .postertrip { display: none; }');
	}
	if(Cfg['ospoil'] !== 0) {
		x.push('.spoiler, .DESU_spoiler { background: #888 !important; color: #ccc !important; }');
	}
	if(Cfg['noscrl'] !== 0) {
		x.push('blockquote { max-height: 100% !important; overflow: visible !important; }');
	}
	if(Cfg['norule'] !== 0) {
		x.push((aib.gazo ? '.chui' : '.rules, #rules, #rules_row') + ' { display: none; }');
	}
	if(aib.kus) {
		x.push(
			'.extrabtns, .ui-resizable-handle, .DESU_oppost > a[onclick]:not([target]) { display: none !important; }\
			.ui-wrapper { display: inline-block; width: auto !important; height: auto !important; padding: 0 !important; }'
		);
	}
	if(aib.nul) {
		x.push(
			'#newposts_get, #postform nobr, .replieslist, #captcha_status, .DESU_thread span[style="float: right;"] { display: none !important; }\
			.ui-wrapper { position: static !important; margin: 0 !important; overflow: visible !important; }\
			.ui-resizable { display: inline !important; }\
			.voiceplay { float: none; }'
		);
	} else if(aib.hana) {
		x.push(
			'#hideinfotd, .reply_, .delete > img, .popup { display: none; }\
			.delete { background: none; }\
			.delete_checkbox { position: static !important; }\
			.file + .DESU_ytObj { float: left; margin: 5px 20px 5px 5px; display: block; }\
			.DESU_ytObj + div { clear: left; }'
		);
	} else if(aib.abu) {
		x.push(
			'.ABU_refmap, .postpanel, .highslide, a[onclick^="window.open"]' +
				(Cfg['ytube'] === 0 ? '' : ', div[id^="post_video"]') + ' { display: none !important; }\
			.DESU_aBtn { -moz-transition: none; -o-transition: none; -webkit-transition: none; transition: none; }'
		);
	} else if(aib.tiny) {
		x.push(
			'form, form table { margin: 0; }\
			.post-hover { display: none !important; }'
		);
	} else if(aib._7ch) {
		x.push('.reply { background-color: ' + getStyle(doc.body, 'background-color') + '; }');
	} else if(aib.gazo) {
		x.push(
			'.DESU_content, #DESU_cfgBody { font-family: arial; }\
			.ftbl { width: auto; margin: 0; }\
			.reply { background: #f0e0d6; }'
		);
	} else if(aib.krau) {
		x.push(
			'img[id^="translate_button"], img[src$="button-expand.gif"], img[src$="button-close.gif"]'
				+ (liteMode ? ', div[id^="disclaimer"]' : '') + ' { display: none !important; }\
			div[id^="Wz"] { z-index: 10000 !important; }\
			div[id^="DESU_hidThr_"] { margin-bottom: ' + (!TNum ? '7' : '2') + 'px; }\
			.file_reply + .DESU_ytObj, .file_thread + .DESU_ytObj { float: left; margin: 5px 20px 5px 5px; display: block; }\
			.DESU_ytObj + div { clear: left; }'
		);
	} else if(aib._420) {
		x.push(
			'.opqrbtn, .qrbtn, .ignorebtn, .hidethread, noscript { display: none; }\
			div[id^="DESU_hidThr_"] { margin: 1em 0; }'
		);
	} else if(aib.brit) {
		x.push(
			'.DESU_postPanel, .DESU_postPanel_op { float: left; margin-top: 0.45em; }\
			a + .threadlinktext { position: relative; top: 17px; }\
			.postthreadlinks, .pagethreadlinks, .pwpostblock { display: none; }\
			.DESU_btnSrc { padding: 0px 10px 10px 0px !important; ' + nav.cFix + 'background-size: cover !important; }'
		);
	} else if(aib.ylil) {
		x.push('.threadbuttons, .expandall, .tooltip { display: none !important; }');
	} else if(aib.fch) {
		x.push('.DESU_spoiler { color: #000; background-color: #000; }');
	}

	if(!$id('DESU_css')) {
		doc.head.appendChild($new('style', {
			'id': 'DESU_css',
			'type': 'text/css',
			'text': x.join(' ')
		}, null));
		if(nav.Chrome) {
			$disp(dForm);
		}
	} else {
		$id('DESU_css').textContent = x.join(' ');
	}
}


/*==============================================================================
									SCRIPT UPDATING
==============================================================================*/

function checkForUpdates(force, fn) {
	var t = +(new Date()).getTime(),
		day = 2*1000*60*60*24,
		updInt =
			Cfg['supdint'] === 0 ? 0
			: Cfg['supdint'] === 1 ? day
			: Cfg['supdint'] === 2 ? day*2
			: Cfg['supdint'] === 3 ? day*7
			: Cfg['supdint'] === 4 ? day*14
			: Cfg['supdint'] === 5 && day*30;
	if(!force && t - +Cfg['lupdchk'] < updInt) {
		return;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/'
			+ (Cfg['betaupd'] ? 'master' : 'stable') + '/Dollchan_Extension_Tools.meta.js',
		headers: {
			'Content-Type': 'text/plain'
		},
		onreadystatechange: function(xhr) {
			if(xhr.readyState !== 4) {
				return;
			}
			if(xhr.status === 200) {
				var dVer = xhr.responseText.match(/@version\s+([0-9.]+)/)[1].split('.'),
					cVer = Cfg['version'].split('.'),
					len = cVer.length > dVer.length ? cVer.length : dVer.length,
					i = 0,
					upd = false;
				if(!dVer) {
					if(force) {
						fn(
							'<div style="color: red; font-weigth: bold;">'
								+ Lng.noConnect[lCode] + '</div>'
						);
					}
					return;
				}
				Cfg['lupdchk'] = t;
				while(i < len) {
					if((+dVer[i] || 0) > (+cVer[i] || 0)) {
						upd = true;
						break;
					} else if((+dVer[i] || 0) < (+cVer[i] || 0)) {
						break;
					}
					i++;
				}
				if(upd) {
					fn('<a style="color: blue; font-weight: bold;" href="' + (
						Cfg['betaupd']
							? 'https://raw.github.com/SthephanShinkufag/Dollchan-Extension-Tools/'
								+ 'master/Dollchan_Extension_Tools.user.js'
							: 'https://github.com/SthephanShinkufag/Dollchan-Extension-Tools/'
								+ 'wiki/Versions'
					)+ '">' + Lng.updAvail[lCode] + '</a>');
				} else if(force) {
					fn(Lng.haveLatest[lCode]);
				}
			} else if(force) {
				fn('<div style="color: red; font-weigth: bold;">' + Lng.noConnect[lCode] + '</div>');
			}
		}
	});
}


/*==============================================================================
									INITIALIZATION
==============================================================================*/

function isCompatible() {
	if(/^(?:about|chrome|opera|res)/i.test(window.location)) {
		return false;
	}
	getImageboard();
	if(/DESU_iframe/.test(window.name)) {
		fixDomain();
		return false;
	}
	if(/DESU_favIframe/.test(window.name)) {
		liteMode = true;
		$event(window, {
			'load': function(e) {
				window.top.postMessage('' + (document.body.offsetHeight + 20), '*');
			}
		});
	}
	if(aib.hana && window.location.pathname === '/settings') {
		setHanaRating();
		return false;
	}
	if(!dForm || $id('DESU_panel')) {
		return false;
	}
	return true;
}

function fixDomain() {
	try {
		doc.domain = aib.dm;
	} catch(e) {
		aib.dm = doc.domain;
	}
}

function getNavigator() {
	var gs, ss, ls, se,
		ua = window.navigator.userAgent;
	nav = {
		Firefox: +(ua.match(/mozilla.*? rv:(\d+)/i) || [0, 0])[1],
		Opera: +(ua.match(/opera(?:.*version)?[ \/]([\d.]+)/i) || [0, 0])[1],
		Chrome: /chrome/i.test(ua)
	};
	gs = nav.Firefox && typeof GM_setValue === 'function';
	ss = nav.Opera && !!scriptStorage;
	ls = window.localStorage && typeof localStorage === 'object';
	se = window.sessionStorage && (sessionStorage.test = 1) === 1;
	sav = {
		GM: !!gs,
		script: ss,
		local: ls,
		cookie: !ls && !ss && !gs,
		session: se,
		isGlobal: gs || ss
	};
	nav.cFix =
		(nav.Firefox && nav.Firefox < 4) ? '-moz-'
		: nav.Chrome ? '-webkit-'
		: '';
	nav.aCFix =
		nav.Firefox ? '-moz-'
		: nav.Chrome ? '-webkit-'
		: '-o-';
	if(nav.Firefox > 4 || nav.Chrome || nav.Opera >= 12) {
		nav.Anim = true;
		nav.aName =
			nav.Firefox ? 'MozAnimationName'
			: nav.Chrome ? 'webkitAnimationName'
			: 'OAnimationName';
		nav.nEvent = nav.Chrome ? 'webkitAnimationEnd' : 'animationend';
		nav.aEvent = function(el, fn) {
			el.addEventListener(nav.nEvent, function aEvent(e) {
				this.removeEventListener(nav.nEvent, aEvent, false);
				fn();
			}, false);
		}
	}
	nav.h5Rep = (nav.Firefox > 6 || nav.Chrome) && !aib.nul && !aib.tiny;
	if(nav.Chrome) {
		window.URL = window.webkitURL;
	}
}

function getPage() {
	var url = (window.location.pathname || '');
	if(aib.ylil) {
		url = url.match(/^\/?(.*?)\/(\d+)?$/);
		brd = url[1].split('-')[0];
		res = '';
		TNum = url[2];
		pageNum = +url[1].split('-')[1] || 1;
		docExt = '';
	} else {
		url = url.match(/^(?:\/?(.*?)\/?)?(res\/|thread-)?(\d+|index|wakaba)?(\.(?:[xme]*html?|php))?$/);
		brd = url[1] || (aib.dfwk ? 'df' : '');
		res = aib.krau ? 'thread-' : 'res/';
		TNum = url[2] ? url[3] : false;
		pageNum = url[3] && !TNum ? +url[3] || 0 : 0;
		docExt = url[4] || (
			aib.gazo ? '.htm'
			: aib._420 ? '.php'
			: '.html'
		);
	}
	favIcon = ($x('.//head//link[@rel="shortcut icon"]', doc) || {}).href;
}

function fixBrd(b) {
	return '/' + (b === '' ? '' : b + '/');
}

function getThrdUrl(h, b, tNum) {
	return '//' + h + fixBrd(b)
		+ (
			(h.indexOf('krautchan.net') + 1) ? 'thread-'
			: (h.indexOf('ylilauta.fi') + 1) ? ''
			: 'res/'
		) + tNum + (
			(h.indexOf('dobrochan.') + 1) ? '.xhtml'
			: (h.indexOf('2chan.net') + 1) ? '.htm'
			: (h.indexOf('420chan.org') + 1) ? '.php'
			: (h.indexOf('ylilauta.fi') + 1) ? ''
			: '.html'
		);
}

function getPageUrl(p) {
	return aib.ylil
		? ('/' + brd + (p === 1 ? '/' : '-' + p))
		: (fixBrd(brd) + (
			p > 0 ? (p + docExt)
			: aib.hana ? ('index' + docExt)
			: ''
		));
}

function getPostform(form) {
	var obj = {},
		tr = aib._7ch ? 'li' : 'tr',
		pre = './/' + tr + '[not(contains(@style,"none"))]//input[not(@type="hidden") and ';
	if(!form) {
		return obj;
	}
	obj.on = true;
	obj.isQuick = false;
	obj.tNum = TNum;
	obj.form = form;
	obj.tr = 'ancestor::' + tr + '[1]';
	obj.recap = $x('.//input[@id="recaptcha_response_field"]', form);
	if(!aib.ylil) {
		obj.cap = $x('.//input[contains(@name,"aptcha") and not(@name="recaptcha_challenge_field")]', form) || obj.recap;
	}
	obj.txta = $x('.//' + tr + '[not(contains(@style,"none"))]//textarea[not(contains(@style,"display: none"))]', form);
	obj.subm = $x('.//' + tr + '//input[@type="submit"]', form);
	obj.file = $x('.//' + tr + '//input[@type="file"]', form);
	obj.passw = $x('.//' + tr + '//input[@type="password"]', form);
	obj.gothr = $x('.//tr[@id="trgetback"]|.//input[@type="radio" or @name="gotothread"]/ancestor::tr[1]', form);
	obj.name = $x(pre + '(@name="field1" or @name="name" or @name="internal_n" or @name="nya1" or @name="akane")]', form);
	obj.mail = $x(pre + (
		aib._410 ? '@name="sage"]'
		: aib.futr ? '@name="denshimeru"]'
		: '(@name="field2" or @name="em" or @name="sage" '
			+ 'or @name="email" or @name="nabiki" or @name="dont_bump")]'
	), form);
	obj.video = $x('.//' + tr + '//input[@name="video" or @name="embed"]', form);
	return obj;
}

function getImageboard() {
	var h = window.location.hostname.match(
			/(?:(?:[^.]+\.)(?=org\.|net\.|com\.))?[^.]+\.[^.]+$|^\d+\.\d+\.\d+\.\d+$|localhost/
		)[0];
	aib.dm = h;
	aib.hana = $xb('.//script[contains(@src,"hanabira")]', doc);
	aib.tiny = $xb('.//form[@name="postcontrols"]', doc);
	aib.krau = h === 'krautchan.net';
	aib.gazo = h === '2chan.net';
	aib.brit = h === 'britfa.gs';
	aib.ylil = h === 'ylilauta.fi' || h === 'ylilauta.org';
	aib.xDForm = aib.brit ? './/div[@class="threadz"]' : './/form[' + (
		aib.hana || aib.krau || aib.ylil ? 'contains(@action,"delete")]'
		: aib.tiny ? '@name="postcontrols"]'
		: aib.gazo ? '2]'
		: '@id="delform" or @name="delform"]'
	);
	dForm = $x(aib.xDForm, doc);
	if(!dForm) {
		return;
	}
	aib.host = window.location.hostname;
	aib.waka = $xb('.//script[contains(@src,"wakaba")]|.//form[contains(@action,"wakaba.pl")]', doc);
	aib.tinyIb = $xb('.//form[contains(@action,"imgboard.php?delete")]', doc);
	aib.kus = $xb('.//script[contains(@src,"kusaba")]', doc);
	aib.abu = $xb('.//script[contains(@src,"wakaba_new.js")]', doc);
	aib.fch = h === '4chan.org';
	aib.nul = h === '0chan.ru';
	aib._7ch = h === '7chan.org';
	aib._410 = h === '410chan.ru';
	aib.hid = h === 'hiddenchan.i2p';
	aib.tire = h === '2--ch.ru';
	aib.dfwk = h === 'dfwk.ru';
	aib.pony = h === 'ponychan.net';
	aib.vomb = h === 'vombatov.net';
	aib.ment = h === '02ch.net';
	aib.futr = h === '2chan.su';
	aib._420 = h === '420chan.org';
	aib.pClass =
		aib.krau ? 'postreply'
		: aib.ylil ? ' answer'
		: aib.tiny || aib.fch ? 'post reply'
		: 'reply';
	aib.opClass =
		aib.kus ? 'postnode'
		: aib.brit ? 'originalpost'
		: aib.fch ? 'op'
		: 'oppost';
	aib.tClass = aib.krau ? 'thread_body' : 'thread';
	aib.xThreads = './/div[' + (
		$xb('.//div[contains(@id,"_info") and contains(@style,"float")]', doc)
			? 'starts-with(@id,"t") and not(contains(@id,"_info"))'
		: aib._420 ? 'contains(@id,"thread")'
		: 'starts-with(@id,"thread")' + (aib._7ch ? 'and not(@id="thread_controls")' : '')
	) + ']';
	aib.xTNum =
		aib.gazo || aib.tiny ? './/input[@type="checkbox"]'
		: (aib.waka && !aib.abu) || aib.brit || aib.tinyIb ? './/a[@name]'
		: aib.kus && !aib._7ch ? 'a[@name][2]'
		: false;
	aib.xRef = aib.tiny ? './/p[@class="intro"]/a[@class="post_no"][2]' : false;
	aib.cRef =
		aib.krau || aib.ylil ? 'postnumber'
		: aib.gazo ? 'del'
		: 'reflink';
	aib.xMsg =
		aib.hana ? './/div[@class="postbody"]'
		: aib.ylil ? './/div[@class="post"]'
		: aib.tiny ? './/p[@class="body"]'
		: aib._7ch ? './/p[@class="message"]'
		: './/blockquote';
	aib.cMsg =
		aib.hana ? 'postbody'
		: aib.ylil ? 'post'
		: aib.tiny ? 'body'
		: aib._7ch ? 'message'
		: false;
	aib.xImages = aib.brit ? './/a[@class="fileinfo"]' : (
		aib.gazo ? '.'
		: aib.tiny || aib.ylil ? './/p[@class="fileinfo"]'
		: aib.hana ? './/div[starts-with(@class,"fileinfo")]'
		: './/span[@class="' + (aib.krau ? 'filename' : aib.fch ? 'fileText' : 'filesize') + '"]'
	) + '//a[contains(@href,".jpg") or contains(@href,".png") or contains(@href,".gif")]'
		+ (aib.nul ? '[1]' : '');
	aib.cTitle =
		aib.krau || aib.ylil ? 'postsubject'
		: aib.tiny || aib.fch ? 'subject'
		: aib.hana ? 'replytitle'
		: 'filetitle';
	aib.cOmPosts =
		aib.krau ? 'omittedinfo'
		: aib.ylil ? 'omitted'
		: aib.hana ? 'abbrev'
		: aib.fch ? 'summary desktop'
		: 'omittedposts';
	aib.xBan =
		aib.krau ? './/span[@class="ban_mark"]/ancestor::p'
		: aib.fch ? './/strong[@style="color: red;"]'
		: false;
	aib.picWrap =
		aib.krau ? '@class="file_thread" or @class="file_reply"'
		: aib.hana ? '@class="file"'
		: false;
	aib.getPicWrap = aib.hana
		? function(el) {
			if(!el.previousElementSibling) {
				el = el.parentNode;
			}
			return el.parentNode;
		}
		: aib.krau ? function(el) {
			return el.parentNode;
		}
		: function(el) {
			return getPost(el);
		}
	aib.getMsg = aib.cMsg
		? function(el) {
			return $c(aib.cMsg, el);
		}
		: function(el) {
			return $t('blockquote', el);
		};
	aib.getRef =
		aib.xRef ? function(el) {
			return $x(aib.xRef, el);
		}
		: aib.fch ? function(el) {
			return $c('postInfo', el).lastElementChild;
		}
		: function(el) {
			return $c(aib.cRef, el);
		};
	aib.getOp =
		(aib.abu || aib.hana || aib.kus || aib.fch) && $c(aib.opClass, doc) ? function(thr, dc) {
			return $c(aib.opClass, thr);
		}
		: aib.ylil ? function(thr, dc) {
			return thr.firstElementChild;
		}
		: aib.brit ? function(thr, dc) {
			var el,
				post = $$new('div', {'style': 'clear: left;'}, null, dc),
				op = $c(aib.opClass, thr);
			$after($c('postmenu', op), post);
			while((el = thr.firstChild).tagName !== 'TABLE') {
				$after(post, el);
				post = el;
			}
			post = $$new('div', null, null, dc);
			$before(thr.firstChild, [post]);
			while(el = op.firstChild) {
				post.appendChild(el);
			}
			$del($t('table', thr));
			return post;
		}
		: function(thr, dc) {
			var el,
				op = $$new('div', null, null, dc),
				opEnd = $$x(aib.xTable + '|div[starts-with(@id,"repl")]', thr, dc);
			while((el = thr.firstChild) !== opEnd) {
				op.appendChild(el);
			}
			if(thr.childElementCount) {
				$before(thr.firstChild, [op]);
			} else {
				thr.appendChild(op);
			}
			return op;
		};
	aib.getTNum =
		aib.xTNum ? function(op, dc) {
			return $$x(aib.xTNum, op, dc).name.match(/\d+/)[0];
		}
		: aib.krau ? function(op, dc) {
			return op.parentNode.previousElementSibling.name;
		}
		: function(op, dc) {
			return op.parentNode.id.match('\\d+' + (aib._420 ? '$' : ''))[0];
		};
	aib.getPNum = aib.gazo
		? function(post) {
			return $t('input', post).name;
		}
		: function(post) {
			return post.id.match(/\d+/)[0];
		};
	aib.getOmPosts = aib.gazo
		? function(el, dc) {
			return $$x('.//font[@color="#707070"]', el, dc);
		}
		: function(el, dc) {
			return $c(aib.cOmPosts, el);
		};
	aib.getSage =
		aib.krau ? function(post) {
			return !!$c('sage', post);
		}
		: aib._410 ? function(post) {
			return $xb(
				'.//span[@class="filetitle" and contains(text(),"' + unescape('%u21E9') + '")]',
				post
			);
		}
		: function(post) {
			var a = $x('.//a[starts-with(@href,"mailto:") or @href="sage"]', post);
			return a && /sage/i.test(a.href);
		}
	aib.getImgInfo = aib.fch
		? function(post) {
			return $c('fileText', post);
		}
		: function (post) {
			return $t('em', post) || $c('filesize', post) || $c('fileinfo', post);
		}
}

function pushPost(post, i) {
	Posts.push(post);
	post.Count = i;
	post.Text = getText(post.Msg);
	post.Img = getImages(post);
	pByNum[post.Num] = post;
	if(i === 0) {
		tByCnt.push(post);
	}
}

function processPost(post, thr, pFn, i) {
	post.thr = thr;
	post.className += ' DESU_post';
	post.Num = aib.getPNum(post);
	post.Msg = aib.getMsg(post);
	pFn(post, i + 1);
}

function parseThread(node, dc, fn) {
	var el, tEl,
		pThr = false,
		thrds = node.getElementsByClassName(aib.tClass);
	if(thrds.length === 0) {
		thrds = $$X(aib.xThreads, node, dc);
		if(thrds.snapshotLength !== 0) {
			$each(thrds, fn);
		} else {
			el = $t('hr', node).parentNode.firstChild;
			while(1) {
				thrds = $$new('div', null, null, dc);
				while(el && (tEl = el.nextSibling) && tEl.tagName !== 'HR') {
					thrds.appendChild(el);
					el = tEl;
				}
				if(pThr) {
					$after(pThr, thrds);
				} else {
					$before(node.firstChild, [thrds]);
				}
				if(!el || !tEl) {
					return;
				}
				if(thrds.childElementCount) {
					fn(thrds);
				}
				pThr = tEl;
				el = tEl.nextSibling;
			}
		}
	} else {
		for(el = 0, tEl = thrds.length; el < tEl; el++) {
			fn(thrds[el]);
		}
	}
}

function parseDelform(node, dc, pFn) {
	var el;
	$$Del('.//script', node, dc);
	if(aib.ylil) {
		$$Del('.//a[@data-embedcode]', node, dc);
		$each($$X('.//div[@class="postinfo"]', node, dc), function(el) {
			if(el.previousElementSibling) {
				$before(el.parentNode.firstChild, [el]);
			}
		});
	} else if(aib.fch) {
		$each($X('.//span[@class="spoiler"]', dForm), function(el) {
			el.className = 'DESU_spoiler';
		});
	}
	if(Posts.length < 2) {
		aib.xPost = aib.fch
			? 'div[2]'
			: './/td' + (aib.gazo ? '[2]' : '[contains(@class,"' + aib.pClass + '")]');
		aib.xTable = $t('table', node)
			? (aib.tire ? 'table[not(@class="postfiles")]' : 'table')
			: false;
		aib.xWrap = aib.xTable
			? './/table/tbody/tr/td' + (
				aib.gazo ? '[2]' : '[contains(@class,"' + aib.pClass + '")]'
			)
			: './/div[contains(@class,"' + aib.pClass + '")]';
		aib.getWrap =
			aib.xTable ? function(post) {
				return post.isOp ? post : $x('ancestor::table[1]', post);
			}
			: aib.fch ? function(post) {
				return post.parentNode;
			}
			: function(post) {
				return post;
			};
		if(aib.xTable || aib.fch) {
			postWrapper = $$x(
				aib.brit ? './/div[starts-with(@id,"replies")]/table'
				: aib.fch ? './/div[@class="postContainer replyContainer"]'
				: './/' + aib.xTable,
				node, dc
			);
			if(dc !== doc && postWrapper) {
				postWrapper = doc.importNode(postWrapper, true);
			}
		}
	}
	parseThread(node, dc, function(thr) {
		var op, i, len, psts;
		if(aib._420 || (aib.tiny && !TNum)) {
			$after(thr, thr.lastChild);
		}
		op = aib.getOp(thr, dc);
		thr.className += ' DESU_thread';
		op.className += ' DESU_oppost';
		op.Num = thr.Num = aib.getTNum(op, dc);
		op.Msg = aib.getMsg(op);
		op.thr = thr;
		op.isOp = true;
		pFn(op, 0);
		if(!nav.Firefox || aib.gazo) {
			thr.pCount = 0;
			$each($$X(aib.xWrap, thr, dc), function(el) {
				processPost(el, thr, pFn, thr.pCount++);
			});
		} else {
			psts = thr.getElementsByClassName(aib.pClass);
			thr.pCount = psts.length;
			for(i = 0, len = psts.length; i < len; i++) {
				processPost(psts[i], thr, pFn, i);
			}
		}
		if(dc === doc) {
			if(!TNum) {
				thr.pCount += (el = aib.getOmPosts(thr, dc)) && (el = el.textContent)
					? +(el.match(/\d+/) || [0])[0] : 0;
			}
			op.dTitle = getTitle(op);
		}
	});
	el = pByNum[window.location.hash.substring(1)];
	if(window.location.hash && el) {
		$event(window, {
			'load': function() {
				setTimeout(function() {
					el.className += ' DESU_post';
				}, 1e3);
			}
		});
	}
	if(liteMode) {
		$$Del('preceding-sibling::node()|following-sibling::node()', dForm, dc);
	}
	return node;
}

function tryToParse() {
	dForm.id = '';
	$disp(dForm);
	try {
		parseDelform(dForm, doc, pushPost);
	} catch(e) {
		$disp(dForm);
		return false;
	}
	if(!nav.Chrome) {
		$disp(dForm);
	}
	return true;
}

function replaceDelform(el) {
	if(aib.fch || aib.krau || Cfg['ctime'] && timeRegex || Cfg['spells'] !== 0 && oSpells.rep[0]) {
		var txt = el.innerHTML;
		if(Cfg['ctime'] && timeRegex) {
			txt = fixTime(txt);
		}
		if(aib.fch || aib.krau) {
			txt = txt.replace(/(^|>|\s|&gt;)(https*:\/\/.*?)(?=$|<|\s)/ig, '$1<a href="$2">$2</a>');
		}
		if(Cfg['spells'] !== 0 && oSpells.rep[0]) {
			txt = doReplace(oSpells.rep, txt);
		}
		el.innerHTML = txt;
	}
}

function preparePage() {
	var el, onhid, onvis;
	pr = getPostform($x('.//textarea/ancestor::form[1]', doc));
	oeForm = $x('.//form[contains(@action,"paint") or @name="oeform"]', doc);
	if(!pr.mail) {
		aib.getSage = function(post) {
			return false;
		}
	}
	$Del('preceding-sibling::node()[preceding-sibling::*[descendant-or-self::*[' + (
		aib.abu ? 'self::form'
		: aib.fch ? 'self::div[@class="boardBanner"]'
		: 'self::div[@class="logo"]'
	) + ' or self::h1]]]', dForm);
	if(aib.krau) {
		$del($t('hr', dForm));
		$del($t('hr', dForm.previousElementSibling));
	}
	if(TNum) {
		onhid = function() {
			doc.body.className = 'blurred';
		};
		onvis = function() {
			doc.body.className = 'focused';
			if(Cfg['updfav'] !== 0 && favIcon) {
				clearInterval(favIconInterval);
				$Del('.//link[@rel="shortcut icon"]', doc.head);
				doc.head.appendChild($new('link', {
					'href': favIcon,
					'rel': 'shortcut icon'
				}, null));
			}
			if(Cfg['updthr'] === 1) {
				setTimeout(function() {
					doc.title = docTitle;
				}, 0);
			}
		};
		if(Cfg['rtitle'] === 0) {
			docTitle = doc.title;
		} else {
			docTitle = '/' + brd + ' - ' + pByNum[TNum].dTitle;
			doc.title = docTitle;
		}
		if(nav.Firefox > 10) {
			doc.addEventListener('mozvisibilitychange', function(e) {
				if(doc.mozHidden) {
					onhid();
				} else {
					onvis();
				}
			}, false);
		} else {
			window.onblur = onhid;
			window.onfocus = onvis;
		}
	} else {
		setTimeout(function() {
			window.scrollTo(0, 0);
		}, 50);
	}
	if(aib.abu) {
		el = $c('DESU_thread', dForm);
		if(TNum && el) {
			$Del('following-sibling::node()', el);
			$after(el, $new('hr', null, null));
		}
		$del($x('.//input[@name="makewatermark"]', pr.form));
		if(!TNum) {
			$del(dForm.nextElementSibling);
			$del(dForm.nextElementSibling);
		}
	} else if(aib.brit) {
		$each($X('.//span[@class="reflink"]', dForm), function(el) {
			var a = el.firstChild;
			$rattr(a, 'onclick');
			a.href = getThrdUrl(aib.host, brd, a.textContent);
			a.target = '_blank';
		});
	} else if(aib.ylil) {
		el = $t('iframe', dForm);
		if(el) {
			$del(el.nextElementSibling);
			$del(el.nextElementSibling);
			$del(el);
		}
	}
	if(TNum) {
		initThreadsUpdater();
		if(Cfg['updthr'] === 2 || Cfg['updthr'] === 3) {
			$after($x('.//div[contains(@class," DESU_thread")]', doc), $event($add(
				'<span id="DESU_getNewPosts">[<a href="#">' + Lng.getNewPosts[lCode] + '</a>]</span>'
			), {
				'click': function(e) {
					$pd(e);
					doc.title = docTitle;
					clearInterval(favIconInterval);
					loadNewPosts(true, null);
				}
			}));
		}
	}
	if(Cfg['enupd'] !== 0) {
		checkForUpdates(false, function(html) {
			$alert(html, 'UpdAvail', false);
		});
	}
}


/*==============================================================================
										MAIN
==============================================================================*/

function doScript() {
	var initTime = (new Date()).getTime();
	oldTime = initTime;
	if(!isCompatible()) {
		return;
	}
	dummy = $new('div', null, null);
	fixDomain();
	fixFunctions();
	getNavigator();
	getPage();
	Log('initBoard');
	readCfg();
	Log('readCfg');
	replaceDelform(dForm);
	Log('replaceDelform');
	if(!tryToParse()) {
		return;
	}
	Log('parseDelform');
	if(Cfg['keynav'] !== 0) {
		initKeyNavig();
		Log('initKeyNavig');
	}
	preparePage();
	Log('preparePage');
	if(!liteMode) {
		addPanel();
		Log('addPanel');
		readFavorites();
		Log('readFavorites');
	}
	initPostform();
	Log('initPostform');
	prepareButtons();
	Log('prepareButtons');
	forEachPost(addPostButtons);
	Log('addPostButtons');
	readPostsVisib();
	if(Cfg['navmrk'] !== 0) {
		readViewedPosts();
	}
	Log('readPosts');
	forEachPost(doPostFilters);
	Log('doPostFilters');
	if(Cfg['delhd'] === 1) {
		forEachPost(mergeHidden);
		Log('mergeHidden');
	}
	if(Cfg['expimg'] !== 0) {
		forEachPost(eventPostImg);
		Log('eventPostImg');
	}
	if(Cfg['expost'] !== 0 && !TNum) {
		forEachPost(expandPost);
		Log('expandPost');
	}
	if(Cfg['mp3'] !== 0) {
		addLinkMP3(null);
		Log('addLinkMP3');
	}
	if(Cfg['ytube'] !== 0) {
		addLinkTube(null);
		Log('addLinkTube');
	}
	if(Cfg['addimg'] !== 0) {
		addLinkImg(dForm, true);
		Log('addLinkImg');
	}
	if(Cfg['imgsrc'] !== 0) {
		addImgSearch(dForm);
		Log('addImgSearch');
	}
	if(Cfg['pimgs'] !== 0) {
		preloadImages(dForm);
		Log('preloadImages');
	}
	if(Cfg['navig'] === 2) {
		genRefMap(pByNum);
		Log('genRefMap');
	}
	if(Cfg['navig'] !== 0) {
		eventRefLink(dForm);
		Log('eventRefLink');
	}
	saveHiddenPosts();
	Log('saveHiddenPosts');
	scriptCSS();
	Log('scriptCSS');
	endTime = (new Date()).getTime() - initTime;
}

if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);
