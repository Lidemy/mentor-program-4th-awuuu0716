<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo List</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <link rel="stylesheet" href="css/index.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  <script src="js/index.js"></script>

</head>

<body>

  <!-- navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
    <a class="navbar-brand" href="#">兔肚莉絲特</a>
    <div>
      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#loadModal">Load</button>
      <button type="button" class="btn btn-primary btn-save-todos">Save</button>
      <button class="btn-save-success" data-toggle="modal" data-target="#saveModal" hidden></button>
    </div>
  </nav>

  <!-- input -->
  <div class="container mt-5">
    <div class="input-group mb-3">
      <input type="text" name="task" class="form-control input__task" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="請輸入待辦事項">
    </div>
    <hr />
    <!-- tasks -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>待辦事項</div>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary active">
            <input type="radio" class="filter" name="all" id="option1" checked> 全部
          </label>
          <label class="btn btn-secondary">
            <input type="radio" class="filter" name="done" id="option2"> 完成
          </label>
          <label class="btn btn-secondary">
            <input type="radio" class="filter" name="undone" id="option3"> 未完成
          </label>
        </div>
      </div>
      <ul class="list-group list-group-flush tasks__container">
      </ul>
    </div>
  </div>

  <!-- Edit Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">編輯待辦事項</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <textarea type="text" class="form-control edit__task" placeholder="請輸入待辦事項"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-close__edit" data-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary btn-save__edit">儲存</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Load Modal -->
  <div class="modal fade" id="loadModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">請輸入您的 Todos id:</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control input-id" placeholder="id"></input>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-close__load" data-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary btn-load-todos">儲存</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Save Success Modal -->
  <div class="modal fade" id="saveModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">儲存成功!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body save-success__message">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</body>

</html>