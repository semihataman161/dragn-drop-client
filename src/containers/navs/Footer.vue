<template>
<footer class="page-footer">
    <div class="footer-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-sm-6">
                    <p class="mb-0 bold">Copyright © {{currentYear}} DragN'Drop Inc. All rights reserved.</p>
                </div>
                <!-- <div class="col-sm-6 d-none d-sm-block">
                    <ul class="breadcrumb pt-0 pr-0 float-right">
                        <li class="breadcrumb-item mb-0">
                            <a href="#" class="btn-link">Review</a>
                        </li>
                        <li class="breadcrumb-item mb-0">
                            <a href="#" class="btn-link">Purchase</a>
                        </li>
                        <li class="breadcrumb-item mb-0">
                            <a href="#" class="btn-link">Docs</a>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
    </div>
</footer>
</template>
<script>
export default {
    data() {
        return {
          currentYear: new Date().getFullYear()  
        }
    },
}
</script>
