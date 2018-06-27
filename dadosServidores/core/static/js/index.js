var mon = 0;

$(document).ready( function() {
	
	$('#b-pesquisa').click(function() {
		//$(this).prop('disabled','true');
		var posting = $.post( "buscadados/", {
			salario: mon/100,
			profissao: $('#t-profissao').val()
		} );
		posting.done(function( data ) {
			//console.log(data);
			$('#b-pesquisa').removeProp('disabled');
			//alert('Load was performed.\n'+JSON.stringify(data));
			buildTable(mon/100, JSON.parse(data));
		});
	});

	$('#t-profissao').keyup(function(e) {
		if (e.which == 13){ //enter
			$('#popup .item.selected').click();
			$('#t-salario').focus();
		}
		else if (e.which == 27){ //esc
			$(this).focusout();
		}
		else if (e.which == 38){ //arrow up
			var i = $('#popup .item').index($('#popup .item.selected'));
			$('#popup .item').removeClass('selected');
			if (i == -1 || i == 0)
				$('#popup .item').eq($('#popup .item').length - 1).addClass('selected');
			else
				$('#popup .item').eq(i-1).addClass('selected');
		}
		else if (e.which == 40){ //arrow down
			var i = $('#popup .item').index($('#popup .item.selected'));
			$('#popup .item').removeClass('selected');
			if (i == -1 || i == $('#popup .item').length - 1)
				$('#popup .item').eq(0).addClass('selected');
			else
				$('#popup .item').eq(i+1).addClass('selected');
		}
		else{
			var posting = $.post( "buscaprofissao/", {
				profissao: $(this).val()
			} );
			posting.done(function( data ) {
				$('#popup').remove();
				var json = JSON.parse(data);
				if (json.length > 0){
					create_popup(json);
				}
			});
		}
		
	});
	$('#t-profissao').focusout( function() {
		if ($('#popup .item.selected').length > 0)
			$(this).val($('#popup .item.selected').html());
		$('#popup').remove();
	});
	
	
	var w = parseInt($(window).width()/2);
	var h = parseInt($(window).height()/2);
	$('.background').css('background-image','url(https://picsum.photos/'+ w +'/'+ h +'/?random)');

	$('#t-salario').on('keydown', function(e) {
		e.preventDefault();
		var d = 0;
		if (e.which >= 96 && e.which <= 105)
			d = 96;
		if (e.which >= 48 && e.which <= 57)
			d = 48;

		if (d > 0){
			var old = mon;
			mon = mon*10 + e.which - d;
			if (mon > 9999999999)
				mon = old;
		}
		else if (e.which == 8){ //backspace
			mon = parseInt(mon/10);
		}
		else if (e.which == 13){ //enter
			$('#b-pesquisa').click();
		}
		else if (e.which == 9){ //tab
			$('#t-profissao').focus();
		}
		$(this).val('R$ '+ (mon/100).toFixed(2));
	});
	
	if ($('#t-profissao').val() != "" && $('#t-salario').val() != ""){
		mon = parseInt($('#t-salario').val());
		$('#b-pesquisa').click();
		$('#t-salario').val("R$ "+ (mon/100).toFixed(2));
	};

	$(document).on("click", '#b-reset', function() {
		$('#result-wrap').remove();
		$('#main-wrap').show();
	});

	$(document).on("click", '#b-share-fb', function() {
		var prof = $('#t-profissao').val();
		var link = 'https://qstoes.tk/tecprog?c='+ prof +'%26s='+ mon;
		window.open('https://www.facebook.com/sharer/sharer.php?u='+link, 'facebook-share-dialog', 'width=626,height=436');
	});

	$(document).on("click", '#b-share-tw', function() {
		var prof = $('#t-profissao').val();
		var link = 'https://qstoes.tk/tecprog?c='+ prof +'%26s='+ mon;
		window.open('http://twitter.com/share?text=Veja o salário dos servidores públicos&url='+ link +'&hashtags=tranparencia,salario,governo');
	});
	
});

function buildTable(sal, json){
	var data = json.data;
	var i;
	$('#main-wrap').hide();
	
	$('#main-wrap').after("<div id='result-wrap'><div id='result-frame' class='frame'><p>Veja os cargos que possuem salário semelhante ao seu:</p><div id='dados'><table class='table'><tbody><tr><th>Cargo</th><th>Salário</th><th>Diferença</th></tr></tbody></table></div><button id='b-reset' class='button'>Nova Busca</button><div class='share'><p>Compartilhar</p><div id='share-wrap'><button id='b-share-fb' class='button'><img src='static/img/facebook3.png'>Facebook</button><button id='b-share-tw' class='button'><img src='static/img/twitter.png'>Twitter</button></div></div></div>");
	
	for (i=0 ; i<json.length ; i++){
	    var porcSal = parseFloat(data[i].salario) / sal;
		var textSal;
		if (porcSal < 1)
			textSal = "<td class='red'> -"+ ((1 - porcSal)*100).toFixed(1) +"% </td>";
		else
			textSal = "<td class='green'> +"+ ((porcSal - 1)*100).toFixed(1) +"% </td>";
		$('#result-frame #dados tbody').append("<tr><td>"+ data[i].cargo +"</td><td>R$ "+ data[i].salario.toFixed(2) +"</td>"+ textSal +"</tr>");
	}
}

function create_popup(json) {
	$('#t-profissao').after("<div id='popup'></div>");
	$.each( json, function( key, value ) {
		if (key < 5)
			$('#popup').append("<div class='item'>"+ value +"</div>");
	});
	$('#popup').css({
		"top": $('#t-profissao').position().top + $('#t-profissao').height() + 10,
		"width": $('#t-profissao').width()
	});
	
	$('#popup .item').on('mouseenter click', function() {
		$('#popup .item').removeClass('selected');
		$(this).addClass('selected');
	});
}