<script setup lang="ts">
import { Link, ShieldCheck, FileText } from 'lucide-vue-next';



</script>
<template>
  <footer className="bg-note-surface border-t border-note-border text-center py-4 text-note-muted">
    <p>© 2025 음표상점. All rights reserved.</p>
    <div class="space-x-4 mt-2">
      <Link href="#" class="hover:text-note-primary">이용약관</Link>
      <ShieldCheck href="#" class="hover:text-note-primary">개인정보처리방침</ShieldCheck>
      <FileText href="#" class="hover:text-note-primary">고객센터</FileText>
    </div>
  </footer>
</template>

