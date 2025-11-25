<?php include 'partials/header.php'; ?>
<?php include 'partials/sidebar.php'; ?>

<main class="main-content">
  <h2 class="page-title">Tổng quan hệ thống kế toán - Chi nhánh</h2>

  <div class="stats-grid">
    <div class="stat-box">
      <h3>Tổng Thu</h3>
      <p class="stat-value">0 VNĐ</p>
    </div>
    <div class="stat-box">
      <h3>Tổng Chi</h3>
      <p class="stat-value">0 VNĐ</p>
    </div>
    <div class="stat-box">
      <h3>Chênh lệch</h3>
      <p class="stat-value">0 VNĐ</p>
    </div>
  </div>

  <div class="image-samples" style="margin-top:20px;">
    <p>Ảnh mẫu (từ screenshot):</p>
    <?php
      $imgs = glob('assets/images/*');
      foreach(array_slice($imgs,0,4) as $i){ echo '<img src="'.$i.'" style="max-width:220px;margin-right:8px;border-radius:8px">'; }
    ?>
  </div>
</main>

<?php include 'partials/footer.php'; ?>
