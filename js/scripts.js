$(function() {
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  };
  function Board(nameBoard) {
    var self = this;
    this.id = randomString();
    this.nameBoard = prompt('Enter a board name');
    this.$element = createBoard();
    function createBoard() {
      var $board = $('<div>').addClass('board container text-center');
      var $boardTitle = $('<h1>').text(self.nameBoard);
      var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column');
      $boardAddColumn.click(function() {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        self.$element.append(column.$element);
      });
      $board.append($board)
        .append($boardTitle)
        .append($boardAddColumn);
      return $board;
    }
  }

  function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();
    function createColumn() {
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('Delete column');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
      $columnDelete.click(function() {
        self.removeColumn();
      });
      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });
      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);
      return $column;
    }
  }
  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    function createCard() {
      var $card = $('<li>').addClass('card text-right');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('x');
      $cardDelete.click(function(){
        self.removeCard();
      });
      $card.append($cardDelete)
        .append($cardDescription);
      return $card;
    }
  }
  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  }

  var boards = {
    name: 'Kanban Boards',
    addBoard: function(board) {
      this.$element.append(board.$element);
    },
    $element: $('#boards')
  };

  function initSortable() {
    $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-board').click(function(){
    var board = new Board(name);
    boards.addBoard(board);
  });

  var kanbanBoard = new Board('Kanban Board');

  boards.addBoard(kanbanBoard);
})