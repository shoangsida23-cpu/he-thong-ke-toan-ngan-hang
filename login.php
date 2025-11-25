<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Đăng nhập hệ thống</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="login-screen">
  <div class="login-wrapper">
    <h1 class="login-title">Đăng nhập</h1>
    <form class="login-form" method="post" action="dashboard.php">
      <label>Tên đăng nhập</label>
      <input type="text" name="username" placeholder="Nhập tên đăng nhập">

      <label>Mật khẩu</label>
      <input type="password" name="password" placeholder="Nhập mật khẩu">

      <button class="btn primary w-100" type="submit">Đăng nhập</button>
    </form>
  </div>
</body>
</html>
