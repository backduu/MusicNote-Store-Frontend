<script setup lang="ts">
import { computed } from 'vue'
import type { Items } from '@/types/Product'

interface Props {
  item: Items
  viewType?: 'grid' | 'list' // grid = 작품 카드, list = 목록(색인)
}

const props = withDefaults(defineProps<Props>(), {
  viewType: 'grid',
})

const priceLabel = computed(() =>
    props.item.price === 0 ? '무료' : `${props.item.price.toLocaleString()}원`,
)
</script>

<template>
  <!-- 카드 전체가 링크. 작은 '상세보기' 글씨만 누르게 하지 않습니다 -->
  <router-link
      :to="`/products/${item.id}`"
      class="paper group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5B54] focus-visible:ring-offset-2"
      :class="viewType === 'list' ? 'rounded-none' : 'rounded-2xl'"
  >
    <!-- ─────────────  GRID : 한 점의 작품  ───────────── -->
    <template v-if="viewType === 'grid'">
      <article
          class="flex h-full flex-col overflow-hidden rounded-2xl bg-[#FDFDFB]
               ring-1 ring-[#16181D]/[0.07] transition-all duration-500 ease-out
               group-hover:-translate-y-1 group-hover:ring-[#16181D]/20"
      >
        <div class="relative aspect-[4/3] overflow-hidden bg-[#EFEFEA]">
          <img
              :src="item.previewUrl"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-[900ms] ease-out
                   group-hover:scale-[1.06]"
          />
          <!-- 아래에서 아주 옅게 깔리는 그림자. 제목 쪽으로 시선을 흘려보냅니다 -->
          <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-t
                   from-[#16181D]/30 via-transparent to-transparent
                   opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        <div class="flex flex-1 flex-col px-5 pb-5 pt-4">
          <p class="text-[11px] tracking-[0.2em] text-[#16181D]/45">
            {{ item.creator }}
          </p>

          <!-- 시그니처: 서명 헤어라인 -->
          <span class="signature mt-2 block" />

          <h3 class="serif-kr mt-3 clamp-2 text-[17px] leading-[1.5] text-[#16181D]">
            {{ item.title }}
          </h3>

          <div class="mt-auto flex items-baseline justify-between pt-5">
            <span class="text-[15px] font-semibold tabular-nums text-[#16181D]">
              {{ priceLabel }}
            </span>
            <span
                class="inline-flex items-center gap-1 text-[12px] text-[#3F5B54]
                     opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            >
              상세보기
              <span class="arrow inline-block">→</span>
            </span>
          </div>
        </div>
      </article>
    </template>

    <!-- ─────────────  LIST : 목록의 한 줄  ───────────── -->
    <template v-else>
      <article
          class="flex items-center gap-4 border-b border-[#16181D]/[0.07] px-2 py-3.5
               transition-colors duration-300 group-hover:bg-[#16181D]/[0.025]"
      >
        <div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#EFEFEA]">
          <img
              :src="item.previewUrl"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-700 ease-out
                   group-hover:scale-110"
          />
        </div>

        <div class="min-w-0 flex-1">
          <h3 class="serif-kr truncate text-[16px] leading-snug text-[#16181D]">
            {{ item.title }}
          </h3>
          <p class="mt-1 truncate text-[12px] tracking-[0.06em] text-[#16181D]/45">
            {{ item.creator }}
          </p>
        </div>

        <div class="flex shrink-0 items-center gap-3 pl-2">
          <span class="text-[14px] font-semibold tabular-nums text-[#16181D]">
            {{ priceLabel }}
          </span>
          <span
              class="arrow text-[13px] text-[#3F5B54] opacity-0 transition-opacity duration-300
                   group-hover:opacity-100"
              aria-hidden="true"
          >
            →
          </span>
        </div>
      </article>
    </template>
  </router-link>
</template>

<style scoped>
/* 제목만 명조로. 국문 카드에서 감성은 대부분 여기서 나옵니다 */
.serif-kr {
  font-family: 'Gowun Batang', 'Nanum Myeongjo', serif;
  font-weight: 400;
  word-break: keep-all; /* 국문 어절 단위 줄바꿈 */
}

.paper {
  font-family:
      'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

/* 시그니처 — 작품에 남긴 서명처럼, 호버하면 선이 그어집니다 */
.signature {
  width: 20px;
  height: 1px;
  background-color: #3f5b54;
  opacity: 0.35;
  transition:
      width 600ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 600ms ease;
}
.group:hover .signature {
  width: 56px;
  opacity: 1;
}

.arrow {
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.group:hover .arrow {
  transform: translateX(3px);
}

.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .paper *,
  .signature,
  .arrow {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  .group:hover .arrow {
    transform: none;
  }
}
</style>