const house_item_template = 
`<div class="col mb-5">
    <div class="card">
        <div class="h-100 btn p-0" onclick="window.open('<%= house.url %>', '_blank')">
            <!-- Product image-->
            <img class="card-img-top" src="<%= house.imgUrl %>" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder"><%= house.title %></h5>
                    <!-- Product price-->
                    $<%= house.price %> 元/月
                </div>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
            <button type="button" class="btn btn-outline-danger">
                <i class="bi bi-heart"></i> Like
            </button>
        </div>
    </div>
</div>`