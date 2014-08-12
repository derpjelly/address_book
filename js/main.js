$(function(){

	var addressBook = { 
		contacts: [
			{
				name: "John Appleseed",
				id: 1,
				note: "This is a note",
				addresses: [
					{
						label: "Main",
						value: "1 Infinite Loop Cupertino, CA 95014"
					}
				],
				emails: [
					{
						label: "Main",
						value: "steve@apple.com"
					}
				],
				phones: [
					{
						label: "Main",
						value: "408-996-1010"
					},
					{
						label: "Mobile",
						value: "1-800-676-2775"
					}
				],
				websites: [
					{
						label: "Main",
						value: "http://apple.com"
					},
					{
						label: "Other",
						value: "http://pixar.com"
					}
				]
			}
		]
	}

	var Contact = function(newName, newNote, newId, addresses, emails, phones, websites){
		var newName = newName || "default name here";
		
		return {
			name: newName,
			note: newNote,
			id: newId,
			addresses: addresses,
			emails: emails,
			phones: phones,
			websites: websites
		}
	}
	

	var app = {

		addEntry: function(){
			var that = this;
			var $modal = $("#modal");
			var source   = $("#add-entry-modal").html();
			var template = Handlebars.compile(source);
			var html = template();
			$modal.html(html);
			this.attachEventHandlerForAddingEntry();

			$modal.slideDown(500);

			var $addressForm = $('#addressForm');
			var $phoneForm = $('#phoneForm');
			var $emailForm = $('#emailForm');
			var $websiteForm = $('#websiteForm');

			// Prevent event "submit" event stacking every time "addEvent()" is called
			$addressForm.off("submit");
			$phoneForm.off("submit");
			$emailForm.off("submit");
			$websiteForm.off("submit");

			that.addressFormArray = [];
			that.phoneFormArray = [];
			that.emailFormArray = [];
			that.websiteFormArray = [];

			var fieldLabel;
			var fieldValue;

			that.$newEntryName = $("#nameOfBizEntry");
			that.$newEntryNotes = $("#notesOfBiz").find("textarea");

			$addressForm.submit(function(event) {
				var $this = $(this);
				var valuesObj = {};
			  fieldLabel = $this.find('#select_label').val();
			  fieldValue = $this.find('#addy').val();
			  $('.form_pop_up').fadeOut(500);

			  var addressHTML = '<div><span class="label">'+ fieldLabel + '</span><p>'+ fieldValue +'</p></div>'

			  valuesObj.label = fieldLabel;
			  valuesObj.value = fieldValue;

			  that.addressFormArray.push(valuesObj);

			  $('.entry_for_address').find(".entry-addreses").append(addressHTML);

			  event.preventDefault();
			});

			$phoneForm.submit(function(event) {
				var $this = $(this);
				var valuesObj = {};
			  fieldLabel = $this.find('#select_label').val();
			  fieldValue = $this.find('#phone').val();
			  $('.form_pop_up').fadeOut(500);

			  var phoneHTML = '<span class="label">'+ fieldLabel + '</span><p>'+ fieldValue +'</p>'

			  valuesObj.label = fieldLabel;
			  valuesObj.value = fieldValue;

			  that.phoneFormArray.push(valuesObj);

			  $('.entry_for_phone').append(phoneHTML);

			  event.preventDefault();
			});

			$emailForm.submit(function(event) {
				var $this = $(this);
				var valuesObj = {};
			  fieldLabel = $this.find('#select_label').val();
			  fieldValue = $this.find('#email').val();
			  $('.form_pop_up').fadeOut(500);

			  var emailHTML = '<span class="label">'+ fieldLabel + '</span><p>'+ fieldValue +'</p>'

			  valuesObj.label = fieldLabel;
			  valuesObj.value = fieldValue;

			  that.emailFormArray.push(valuesObj);

			  $('.entry_for_email').append(emailHTML);

			  event.preventDefault();
			});

			$websiteForm.submit(function(event) {
				var $this = $(this);
				var valuesObj = {};
			  fieldLabel = $this.find('#select_label').val();
			  fieldValue = $this.find('#website').val();
			  $('.form_pop_up').fadeOut(500);

			  var webHTML = '<span class="label">'+ fieldLabel + '</span><p>'+ fieldValue +'</p>'

			  valuesObj.label = fieldLabel;
			  valuesObj.value = fieldValue;

			  that.websiteFormArray.push(valuesObj);

			  $('.entry_for_web').append(webHTML);

			  event.preventDefault();
			});
		},

		appendEntry: function(){
			var that = this;

			// that.addressFormArray.forEach(function(el, index, arr){
			// 	addressBook.contacts.addresses.push(el);
			// });

			// that.phoneFormArray.forEach(function(el, index, arr){
			// 	addressBook.contacts.phones.push(el);
			// });

			// that.emailFormArray.forEach(function(el, index, arr){
			// 	addressBook.contacts.emails.push(el);
			// });

			// that.websiteFormArray.forEach(function(el, index, arr){
			// 	addressBook.contacts.websites.push(el);
			// });

			console.log(that.addressFormArray);
			console.log(that.phoneFormArray);
			console.log(that.emailFormArray);
			console.log(that.websiteFormArray);
			console.log(that.$newEntryName.val());

			var addresses = that.addressFormArray;
			var phones = that.phoneFormArray;
			var emails = that.emailFormArray;
			var websites = that.websiteFormArray;
			var newName = that.$newEntryName.val();
			var newNote = that.$newEntryNotes.val();
			var newId = Math.floor(Math.random() * 100000000);

			addressBook.contacts.push(new Contact(newName, newNote, newId, addresses, emails, phones, websites));

			that.init();

			// invoke click handler defined within attachEventHandlers method
			$('.cancelBtn').click();
		},

		removeEntry: function(removeSectionId){
			var that = this;
			var arrayItemToRemove = _.find(addressBook.contacts, function(entry){ return entry.id === removeSectionId; });
			var indexToRemove = addressBook.contacts.indexOf(arrayItemToRemove);
			addressBook.contacts.splice(indexToRemove, 1);

			that.init();
		},

		editEntry: function(){

		},

		invokeModal: function(obj){
			// obj contains: DOM element, reference to label, reference to value
		},
		attachEventHandlers: function(){
			var that = this;
			$(".addEntry").on("click", function(){
				that.addEntry();
			});
		},
		attachEventHandlerToRemoveEntry: function(){
			var that = this;

			$(".remove_entry").on("click", function(e){
				var removeSectionId = $(this).parent("section").data("entryId");
				that.removeEntry(removeSectionId);
			});
		},
		attachEventHandlerForAddingEntry: function(){
			$(".addEntryBtn").on("click",function(){
				var elId = $(this).attr('name');
				var popupForm = $(".form_pop_up");
				popupForm.fadeIn(200);
				popupForm.children().hide();
				popupForm.find('#'+elId).show();
			});
			$('.closePopBtn').on("click",function(){
				var popupForm = $(".form_pop_up");
				popupForm.fadeOut(200);
				$(this).parent().parent().fadeOut(200);
			});
			$('.cancelBtn').on("click",function(){
				var modal = $("#modal");
				modal.slideUp(500);
			});
			$("#newEntrySubmit").on("click", function(e){
				e.preventDefault();
				app.appendEntry();
			});
		},
		init: function(innerInvoke){
			var source   = $("#entries-template").html();
			var template = Handlebars.compile(source);

			var context = addressBook;
			var html = template(context);
			$("#entries").html(html);

			this.attachEventHandlerToRemoveEntry();

			if(innerInvoke === true){
				this.attachEventHandlers();
			}
		}
	}

	app.init(true);

});