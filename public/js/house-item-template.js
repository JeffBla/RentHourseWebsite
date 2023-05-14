const house_item_template = 
`<div class="col mb-5">
    <div class="card" title="來源：<%= house.coming_from %>">
        <div class="h-100 btn p-0" onclick="window.open('<%= house.url %>', '_blank')">
            <!-- Product image-->
            <img class="card-img-top" src="<%= house.img_url %>"/>
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <div>
                    <h5 class="fw-bolder multiline-ellipsis"><%= house.title %></h5>
                    </div>
                    <!-- Product price-->
                    <p class="fs-5">$<%= Math.floor(house.price_permonth) %> 元/月</p>
                </div>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
            <button type="button" class="btn btn-outline-danger" onclick="likeBtnClick('likeIcon<%= house.id %>','<%= house.id %>')">
                <% if (house.like) { %>
                    <i class="bi bi-heart-fill" id="likeIcon<%= house.id %>"></i> Like
                <% } else { %>
                    <i class="bi bi-heart" id="likeIcon<%= house.id %>"></i> Like
                <% } %>
            </button>
        </div>
    </div>
</div>`

const page_btns_template = 
`<nav>
<ul class="pagination">
    <% const current = parseInt(currentPage); %>
    <% const total = parseInt(totalPage); %>
    <% if ( current == 1 ) { %>
        <li class="page-item disabled"><a class="page-link" href="#section">Previous</a></li>
    <% } else { %>
        <li class="page-item"><a class="page-link" href="#section">Previous</a></li>
    <% } %>

    <% if ( total <= 9 ) { %>
        <% for ( var page = 1; page <= total; page++ ) { %>
            <% if ( page == current ) { %>
                <li class="page-item active"><a class="page-link" href="#section"><%= page %></a></li>
            <% } else { %>
                <li class="page-item"><a class="page-link" href="#section"><%= page %></a></li>
            <% } %>
        <% } %>
        <% } else if ( current <= 5 ) { %>
            <% for ( var page = 1; page <= current+1; page++ ) { %>
                <% if ( page == current ) { %>
                    <li class="page-item active"><a class="page-link" href="#section"><%= page %></a></li>
                <% } else { %>
                    <li class="page-item"><a class="page-link" href="#section"><%= page %></a></li>
                <% } %>
            <% } %>
            <li class="page-item disabled"><span class="page-link">...</span></li>
            <li class="page-item"><a class="page-link" href="#"section><%= total-1 %></a></li>
            <li class="page-item"><a class="page-link" href="#section"><%= total %></a></li>
    <% } else if ( current > total-5 ) { %>

        <li class="page-item"><a class="page-link" href="#section">1</a></li>
        <li class="page-item"><a class="page-link" href="#section">2</a></li>
        <li class="page-item disabled"><span class="page-link">...</span></li>
        <% for ( var page = current-1; page <= total; page++ ) { %>
            <% if ( page == current ) { %>
                <li class="page-item active"><a class="page-link" href="#section"><%= page %></a></li>
            <% } else { %>
                <li class="page-item"><a class="page-link" href="#section"><%= page %></a></li>
            <% } %>
        <% } %>
    <% } else { %>
        <li class="page-item"><a class="page-link" href="#section">1</a></li>
        <li class="page-item"><a class="page-link" href="#section">2</a></li>
        <li class="page-item disabled"><span class="page-link">...</span></li>
        <li class="page-item"><a class="page-link" href="#section"><%= current-1 %></a></li>
        <li class="page-item active"><a class="page-link" href="#section"><%= current %></a></li>
        <li class="page-item"><a class="page-link" href="#section"><%= current+1 %></a></li>
        <li class="page-item disabled"><span class="page-link">...</span></li>
        <li class="page-item"><a class="page-link" href="#section"><%= total-1 %></a></li>
        <li class="page-item"><a class="page-link" href="#section"><%= total %></a></li>
    <% } %>
  <% if ( current == total ) { %>
      <li class="page-item disabled"><a class="page-link" href="#section">Next</a></li>
  <% } else { %>
      <li class="page-item"><a class="page-link" href="#section">Next</a></li>
  <% } %>
</ul>
</nav>`