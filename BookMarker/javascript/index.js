$(document).ready(function() {
	
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

	
	var bookmarksList = $('#bookmarks-list');
	bookmarks.forEach(function(bookmark) {
		bookmarksList.append('<tr><td>' + bookmark.name + '</td><td><a href="' + bookmark.url + '" target="_blank">' + bookmark.url + '</a></td><td><button class="btn btn-primary edit-btn" data-id="' + bookmark.id + '">Edit</button> <button class="btn btn-danger delete-btn" data-id="' + bookmark.id + '">Delete</button></td></tr>');
	});

	
	$('#add-form').submit(function(event) {
		event.preventDefault();
		var name = $('#name').val();
		var url = $('#url').val();
		var id = Date.now();
		var bookmark = {
			name: name,
			url: url,
			id: id
		};
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		bookmarksList.append('<tr><td>' + name + '</td><td><a href="' + url + '" target="_blank">' + url + '</a></td><td><button class="btn btn-primary edit-btn" data-id="' + id + '">Edit</button> <button class="btn btn-danger delete-btn" data-id="' + id + '">Delete</button></td></tr>');
		$('#name').val('');
		$('#url').val('');
	});

	
	bookmarksList.on('click', '.edit-btn', function() {
		var id = $(this).data('id');
		var bookmark = bookmarks.find(function(bookmark) {
			return bookmark.id === id;
		});
		if (!bookmark) {
			return;
		}
		var newName = prompt('Enter new name:', bookmark.name);
		var newUrl = prompt('Enter new URL:', bookmark.url);
		if (!newName || !newUrl) {
			return;
		}
		bookmark.name = newName;
		bookmark.url = newUrl;
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		$(this).parent().siblings().eq(0).text(newName);
		$(this).parent().siblings().eq(1).html('<a href="' + newUrl + '" target="_blank">' + newUrl + '</a>');
	});

	
	bookmarksList.on('click', '.delete-btn', function() {
		var id = $(this).data('id');
		var bookmarkIndex = bookmarks.findIndex(function(bookmark) {
			return bookmark.id === id;
		});
		if (bookmarkIndex === -1) {
			return;
		}
		bookmarks.splice(bookmarkIndex, 1);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		$(this).closest('tr').remove();
	});
});