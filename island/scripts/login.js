// Create functions for activation and deactivation of input fields

function initialDeactivate() {
	deactivate(this);
};

function activate(myElement) {	
	if ( myElement.value == '') {
		$(myElement).removeClass('inactive');
		$(myElement).animate({ backgroundColor: "#ffffff" }, "slow");
	};
	// if($('.password').val() == '') {$('.password').removeClass('inactive');};
};

function deactivate(myElement) {
	if ( myElement.value == '') {
		$(myElement).addClass('inactive');
		$(myElement).animate({ backgroundColor: "#FEFFBF" }, "slow");
	};
	if($('.password').val() == '') {$('.password').addClass('inactive');};
};

// END FORM DEACTIVATION 

var kt_reload = function(){
              $("#kids").load("kids/?" + window.location.search.substring(1), {}, function(){
                  parent.tb_init('a.thickbox, area.thickbox, input.thickbox');
                  parent.tb_remove();
              });
        };
        var gt_reload = function(){
              $("#groups").load("groups/?" + window.location.search.substring(1), {}, function(){
                  parent.tb_init('a.thickbox, area.thickbox, input.thickbox');
                  parent.tb_remove();
              });
        };

var tbqs = '?height=200&width=300&modal=false'
var tbql = '?height=200&width=600&modal=false'

$(document).ready(function(){

        // Add on thicbkox parameters dynamically
        $.each($('.thickbox'),function(){
             $(this).attr('href', $(this).attr('href') + tbqs); 
        });
        $.each($('.thickbox.large'),function(){
             $(this).attr('href', $(this).attr('href') + tbql); 
        });
        
        // Make all the form actions pass a flag indicating ajax requests       
        $.each($('form.ajax'),function(){
             $(this).attr('action', $(this).attr('action') + '?ajax=true'); 
        });

        /* $('#kidAddForm').ajaxForm(kt_reload);
        $('#groupAddForm').ajaxForm(gt_reload); */
 
	// Notifications
		$('.changeNotification').animate({ backgroundColor: "#FEFF7F" }, "fast").animate({ backgroundColor: "#FFFFDF" }, "slow");
		
		// Inputs with suggested text inside
		$('.suggestedText').each(initialDeactivate);
		$('.suggestedText').focus(function () {
			activate(this);
		});
		$('.suggestedText').blur(function () {
			deactivate(this);
		});
	
	// Delete Confirmation
	$('.delete a').click(function() {
		if ( $(this).parent().parent().is('.player') ) {
			var answer = confirm("Are you sure you want to delete this player?");
			return answer;
		};
		if ( $(this).parent().parent().is('.group') ) {
			var answer = confirm("Are you sure you want to delete this group? Note: the group's players will not be deleted.");
			return answer;
		};
	});
	
	// Send to Another Account
	//$('.sendToAnotherAccount a').click(function() {
        //		var email = prompt("What email address would you like to transfer this player to?");
        //		return false;
	//});
	
	// Rename Player
	//$('.rename a').click(function() {
        //		var newName = prompt("Rename player to:");
        //		return false;
	//});
	
	// Action for "Create Player" Input
	$('#id_name').val('Player Name');
	$('#id_name').addClass('inactive');
	$('#id_name').focus(function() {
		if (this.value == "Player Name") { this.value = "" };
		$(this).animate({ color: "#000000" });
	});
	$('#id_name').blur(function() {
		if (this.value == "") {
			this.value = "Player Name";
			$(this).animate({ backgroundColor: "#FEFFAF" }, "slow");
		}
		else {
			$(this).animate({ backgroundColor: "#DBFFCF" }, "slow");
			$(this).removeClass('inactive');
		};
	});
	
	// Error checking for "Create Player" button
	$('#createPlayerButton').click(function() {
		if ($('#id_name').val() == "Player Name" || $('#id_name').val() == "") {
			var pn = prompt("Please enter a name for your player.");
            if (pn){
                $('#id_name').attr('value', pn);
            }else{
                return false;
            }
		}
		else {
			return true;
		}
	});

	// Error checking for "Create Player Spanish" button
	$('#createPlayerButtonSp').click(function() {
		if ($('#id_name').val() == "Player Name" || $('#id_name').val() == "") {
			var pn = prompt("Por favor escoge un nombre para su jugador...");
            if (pn){
                $('#id_name').attr('value', pn);
            }else{
                return false;
            }
		}
		else {
			return true;
		}
	});
	
	// Action for "Enter Group Name" Input
	$('#id_group_name').val('Group Name');
	$('#id_group_name').addClass('inactive');
	$('#id_group_name').focus(function() {
		if (this.value == "Group Name") { this.value = "" };
		$(this).animate({ color: "#333" });
	});
	$('#id_group_name').blur(function() {
		if (this.value == "") {
			this.value = "Group Name";
			$(this).animate({ backgroundColor: "#FEFFAF" }, "slow");
		}
		else {
			$(this).animate({ backgroundColor: "#DBFFCF" }, "slow");
			$(this).removeClass('inactive');
		};
	});
	
	// Error checking for "Create Group" button
	$('#createGroupButton').click(function() {
		if ($('#id_group_name').val() == "Group Name" || $('#id_group_name').val() == "") {
            var gn = prompt("Please enter a name for your group.");
            if (gn){
                $('#id_group_name').attr('value', gn);
            }else{
                return false;
            }
		}
		else {
			return true;
		}
	});

	// Error checking for "Create Group" button
	$('#createGroupButtonSp').click(function() {
		if ($('#id_group_name').val() == "Group Name" || $('#id_group_name').val() == "") {
            var gn = prompt("Por favor escoge un nombre para su grupo...");
            if (gn){
                $('#id_group_name').attr('value', gn);
            }else{
                return false;
            }
		}
		else {
			return true;
		}
	});
	
});

// Suggested Text for Text Inputs
function hideSuggestion(textField) {
	alert(textField.title);
};

function showSuggestion(textField) {
};
