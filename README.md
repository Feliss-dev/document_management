📌 Hệ Thống Quản Lý Minh Chứng
🔹 Giới Thiệu
Hệ thống Quản lý Minh Chứng là một nền tảng hỗ trợ cán bộ, công nhân viên chức, đặc biệt là giảng viên trong lĩnh vực giáo dục đào tạo, dễ dàng quản lý, tra cứu và tổ chức các minh chứng cần thiết phục vụ công tác đánh giá chất lượng.

Trong quá trình kiểm định, đánh giá chương trình đào tạo, báo cáo định kỳ hàng quý hoặc hàng năm, các cơ sở giáo dục cần thu thập, tổng hợp và lưu trữ hệ thống các văn bản, tài liệu làm minh chứng cho thành tích, kết quả đạt được. Hệ thống này được xây dựng dựa trên các yêu cầu đặc tả của Trường Đại học Tài nguyên và Môi trường Hà Nội, nhằm tối ưu hóa quy trình lưu trữ và tra cứu minh chứng phục vụ công tác báo cáo một cách thuận tiện và hiệu quả.

🚀 Tính Năng Chính
Hệ thống bao gồm các mô-đun chức năng quan trọng như:

✅ Quản lý tài khoản: Đăng ký, đăng nhập, phân quyền người dùng.
✅ Quản lý khoa: Quản lý danh sách các khoa trong hệ thống.
✅ Quản lý danh mục văn bản:

Lĩnh vực
Loại văn bản
Cấp ban hành
✅ Quản lý văn bản: Lưu trữ và tìm kiếm văn bản minh chứng.
✅ Quản lý tiêu chuẩn: Quản lý tiêu chí, tiêu chuẩn đánh giá.
✅ Quản lý minh chứng: Liên kết, sắp xếp minh chứng theo tiêu chuẩn đánh giá.
Với hệ thống này, giảng viên và cán bộ quản lý có thể dễ dàng kiểm soát, ghi chú, trích dẫn các minh chứng trong quá trình lập báo cáo, giảm tải khối lượng công việc và tối ưu hóa quy trình lưu trữ, tra cứu tài liệu một cách khoa học và hiệu quả.

🛠 Công Nghệ Sử Dụng
Back-end: Node.js / NestJS / Prisma ORM
Front-end: React.js / Next.js
Database: MySQL
Authentication: JWT / OAuth2
Deployment: Docker / Kubernetes

📌 Cài Đặt & Khởi Chạy
1️⃣ Clone repository

- git clone git@github.com:Feliss-dev/document_management.git
- cd document_management

2️⃣ Cấu hình môi trường
Tạo file .env và thiết lập kết nối database:


(Đối với DB có thể thay đổi đường dẫn tùy chọn phụ thuộc vào môi trường MySQL trong máy mọi người)

3️⃣ Cài đặt dependencies

npm install

4️⃣ Chạy Prisma migration

npx prisma migrate dev 

npx prisma db push

5️⃣ Khởi động dự án

npm run dev

Hãy tiến hành kiểm thử và khởi động dự án nhé! Đây là các bước chi tiết để cài và chạy dự án.

✨ Đóng Góp & Phát Triển
Mọi đóng góp đều được chào đón! Nếu bạn muốn cải thiện hoặc bổ sung tính năng, vui lòng gửi Pull Request hoặc tạo Issue trong repository này.

📩 Liên hệ: your-email@example.com

🚀 Hãy cùng xây dựng một hệ thống quản lý minh chứng hiệu quả và chuyên nghiệp! 🚀


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
