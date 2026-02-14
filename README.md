# ブログサイト

Vue 3 + Supabase で構築されたポートフォリオ・ブログサイト

## 機能

- ブログ記事の作成・編集・削除（Markdown対応）
- プロジェクト一覧の動的表示
- コンタクトフォーム
- 管理者認証（Supabase Auth）

## 技術スタック

- **フロントエンド**: Vue 3 (Composition API), Vue Router 4
- **バックエンド**: Supabase (PostgreSQL + Auth + Storage)
- **ビルドツール**: Vite 6
- **Markdown**: marked + DOMPurify

## 環境構築

### 前提条件

- Node.js 18以上
- Supabaseアカウント

### 1. リポジトリのクローン

```bash
git clone https://github.com/hiroki922/blog-site.git
cd blog-site
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. Supabaseプロジェクトのセットアップ

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. SQL Editorで以下のテーブルを作成：

```sql
-- blogsテーブル
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  content text not null,
  tags text[] default '{}',
  read_time text default '5分で読める',
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.blogs enable row level security;
create policy "公開ブログは誰でも閲覧可能" on public.blogs for select using (published = true);
create policy "管理者は全て閲覧可能" on public.blogs for select using (auth.role() = 'authenticated');
create policy "管理者は作成可能" on public.blogs for insert with check (auth.role() = 'authenticated');
create policy "管理者は更新可能" on public.blogs for update using (auth.role() = 'authenticated');
create policy "管理者は削除可能" on public.blogs for delete using (auth.role() = 'authenticated');

-- projectsテーブル
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text,
  tech_stack text[] default '{}',
  github_url text,
  demo_url text,
  display_order integer not null default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;
create policy "公開プロジェクトは誰でも閲覧可能" on public.projects for select using (published = true);
create policy "管理者は全て閲覧可能" on public.projects for select using (auth.role() = 'authenticated');
create policy "管理者は作成可能" on public.projects for insert with check (auth.role() = 'authenticated');
create policy "管理者は更新可能" on public.projects for update using (auth.role() = 'authenticated');
create policy "管理者は削除可能" on public.projects for delete using (auth.role() = 'authenticated');

-- contactsテーブル
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.contacts enable row level security;
create policy "誰でも作成可能" on public.contacts for insert with check (true);
create policy "管理者のみ閲覧可能" on public.contacts for select using (auth.role() = 'authenticated');
create policy "管理者は更新可能" on public.contacts for update using (auth.role() = 'authenticated');
create policy "管理者は削除可能" on public.contacts for delete using (auth.role() = 'authenticated');
```

3. Storage に `project-images` バケットを作成（Public）
4. Authentication > Users から管理者ユーザーを作成

### 4. 環境変数の設定

`.env.local` ファイルをプロジェクトルートに作成：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Supabaseダッシュボードの **Settings > API** からURLとAnon Keyを取得してください。

### 5. ダミーデータの投入（任意）

動作確認用のサンプルデータを一括で投入できます：

```sql
-- サンプルブログ記事
insert into public.blogs (slug, title, description, content, tags, read_time, published) values
(
  'hello-world',
  'はじめての投稿',
  'ブログサイトを立ち上げました。技術スタックや今後の方針について書いています。',
  '## はじめに\n\nこのブログサイトはVue 3とSupabaseで構築しています。\n\n## 技術スタック\n\n- **Vue 3**: フロントエンドフレームワーク\n- **Supabase**: バックエンド（DB・認証・ストレージ）\n- **Vite**: ビルドツール\n\n## おわりに\n\nこれからどんどん記事を書いていきます！',
  array['Vue', 'Supabase', '雑記'],
  '3分で読める',
  true
),
(
  'vue3-composition-api',
  'Vue 3 Composition APIの使い方',
  'Vue 3のComposition APIについて、実際のコード例を交えながら解説します。',
  '## Composition APIとは\n\nVue 3から導入された新しいAPIです。\n\n## 基本的な使い方\n\n```javascript\nimport { ref, computed } from ''vue''\n\nconst count = ref(0)\nconst doubled = computed(() => count.value * 2)\n```\n\n## まとめ\n\nComposition APIを使うとロジックの再利用がしやすくなります。',
  array['Vue', 'JavaScript', 'フロントエンド'],
  '5分で読める',
  true
),
(
  'supabase-getting-started',
  'Supabaseで始めるバックエンド開発',
  'FirebaseライクなオープンソースBaaSのSupabaseを使ってみた感想と基本的な使い方をまとめました。',
  '## Supabaseとは\n\nPostgreSQLベースのオープンソースBaaSです。\n\n## できること\n\n- データベース（PostgreSQL）\n- 認証\n- ストレージ\n- リアルタイム購読\n\n## まとめ\n\nFirebaseの代替として非常に有力な選択肢です。',
  array['Supabase', 'バックエンド', 'PostgreSQL'],
  '4分で読める',
  false
);

-- サンプルプロジェクト
insert into public.projects (title, description, tech_stack, github_url, display_order, published) values
(
  'ブログサイト',
  'Vue 3とSupabaseで構築したポートフォリオ・ブログサイト。管理画面からブログ記事やプロジェクトを管理できます。',
  array['Vue 3', 'Supabase', 'Vite', 'JavaScript'],
  'https://github.com/hiroki922/blog-site',
  1,
  true
),
(
  'タスク管理アプリ',
  'シンプルなタスク管理アプリ。ドラッグ&ドロップでタスクの並び替えができます。',
  array['React', 'TypeScript', 'Tailwind CSS'],
  null,
  2,
  true
),
(
  ' 天気予報アプリ',
  'OpenWeatherMap APIを使った天気予報アプリ。現在地の天気と週間予報を表示します。',
  array['Vue 3', 'Axios', 'CSS'],
  null,
  3,
  true
);
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

`http://localhost:5173` でアクセスできます。

## 管理画面

`/login` からメールアドレスとパスワードでログインすると管理画面にアクセスできます。

| パス | 説明 |
|------|------|
| `/admin` | ダッシュボード |
| `/admin/blog` | ブログ記事管理 |
| `/admin/projects` | プロジェクト管理 |
| `/admin/contacts` | お問い合わせ管理 |

## ビルド

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが生成されます。
