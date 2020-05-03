---
title: News
permalink: /news/
---

# News

<p><a href="{{ site.baseurl }}/feed.xml">RSS</a>를 구독하시면 최신 정보를 빠르게 받아보실 수 있습니다.</p>

<br>

{% for post in site.posts limit:10 %}
   <div class="post-preview">
   <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
   <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span><br>
   {% if post.badges %}{% for badge in post.badges %}<span class="badge badge-{{ badge.type }}">{{ badge.tag }}</span>{% endfor %}{% endif %}
   {{ post.content | split:'<!--more-->' | first }}
   {% if post.content contains '<!--more-->' %}
      <a href="{{ site.baseurl }}{{ post.url }}">read more</a>
   {% endif %}
   </div>
   <hr>
{% endfor %}

더 많은 정보를 <a href="{{ site.baseurl }}/archive/">아카이브</a>에서 확인해보세요.
