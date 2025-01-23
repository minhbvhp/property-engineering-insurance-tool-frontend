"server-only";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const features = [
    {
      title: "Quản lý linh hoạt",
      details: [
        "Xây dựng, chỉnh sửa và theo dõi các quy trình dịch vụ từ đầu đến cuối.",
        "Phân quyền người dùng, đảm bảo mỗi bộ phận thực hiện đúng vai trò của mình.",
      ],
    },

    {
      title: "Theo dõi thời gian thực",
      details: [
        "Giao diện trực quan hiển thị trạng thái từng bước trong quy trình.",
        "Dễ dàng cập nhật trạng thái giúp các bộ phận theo dõi được công việc của mình.",
      ],
    },

    {
      title: "Báo cáo và thống kê",
      details: [
        "Tổng hợp dữ liệu để tạo các báo cáo chi tiết.",
        "Thống kê dữ liệu dưới dạng biểu đồ trực quan.",
      ],
    },

    {
      title: "Tích hợp đa nền tảng",
      details: [
        "Hỗ trợ trên các thiết bị di động và máy tính.",
        "Kết nối dễ dàng với các phần mềm khác.",
      ],
    },
  ];

  return (
    <div
      className="grid min-h-screen items-center justify-items-center p-8 pb-10 
    bg-gradient-to-br from-[#c8eaee] to-[#fff8dc]"
    >
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        <Image
          src="/logo/baoviet.svg"
          alt="Bao Viet Logo"
          width={320}
          height={38}
          priority
        />
        <p>
          Ứng dụng web quản lý quy trình dịch vụ của công ty là một giải pháp số
          hóa hiện đại, được thiết kế để tối ưu hóa và tự động hóa các quy trình
          nội bộ, giúp doanh nghiệp hoạt động hiệu quả hơn. Với công cụ này,
          công ty sẽ giảm thiểu sai sót, tăng tốc độ xử lý và nâng cao chất
          lượng dịch vụ, từ đó cải thiện sự hài lòng của khách hàng và đạt được
          lợi thế cạnh tranh trên thị trường.
        </p>

        <div className="w-full flex items-center justify-center 2xl:py-8">
          <h4 className="scroll-m-20 text-2xl text-center font-semibold text-primary">
            Tính năng nổi bật
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4">
          {features.map((feature, feature_index) => (
            <Card
              key={`feature-${feature_index}`}
              className="bg-white/40 backdrop-blur-sm shadow-md rounded-lg p-2"
            >
              <CardContent className="flex h-48 items-center justify-center">
                <div className="flex group select-none">
                  <div className="text-amber-700 px-2 group-hover:hidden">
                    <span className="text-lg text-center font-semibold text-amber-700">
                      {feature.title}
                    </span>

                    <div className="flex justify-center pt-4">
                      <svg
                        className="animate-bounce"
                        width="28"
                        height="28"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6H11L7.5 10.5L4 6Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="hidden group-hover:block">
                    {feature.details.map((detail, detail_index) => (
                      <ul key={`details-${detail_index}`} className="list-disc">
                        <li
                          key={`detail-${detail_index}`}
                          className="pt-2 text-amber-800"
                        >
                          {detail}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex w-full items-center justify-center flex-col sm:flex-row md:pt-4">
          <Link
            className="rounded-full border border-solid border-transparent 
            transition-colors flex items-center justify-center 
            bg-primary text-background hover:bg-secondary
            text-sm sm:text-base h-14 px-4 sm:px-5 select-none"
            href="/login"
          >
            Trải nghiệm ngay
          </Link>
        </div>
      </main>
    </div>
  );
}
