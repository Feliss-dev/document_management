import { IconExcel, IconPdf, IconWord } from "@/components/ui/file-icon";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface SoVanBanPageProps {
    params: Promise<{
        soVanBan: string
    }>
}
const viewVanBan = async ({
    params
}: SoVanBanPageProps) => {
    //Lấy thông tin người dùng hiện tại
    const profile = await currentProfile();

    //Kiểm tra nếu không có thông tin người dùng
    if (!profile) {
        redirect("/home");
    }

    //Lấy số văn bản từ params và giải mã
    const soVanBan = decodeURIComponent((await params).soVanBan);
    // console.log(profile);

    //Lấy thông tin văn bản từ số văn bản
    const vanBan = await db.taiLieu.findUnique({
        where: {
            soVanBan: soVanBan
        },
        include: {
            file: true,
            donVi: true,
            linhVuc: true,
            capBanHanh: true,
            loaiVanBan: true
        }
    });
    // console.log(vanBan);

    //Kiểm tra nếu không tìm thấy văn bản
    if (!vanBan) {
        return <div>Không tìm thấy văn bản</div>
    }

    const QUANLY_KHOA = profile?.vaiTro === 'QUANLY' && profile?.maDonVi === vanBan?.maDonVi;

    const canView = profile?.vaiTro === 'QUANTRIVIEN' || QUANLY_KHOA;

    if (!canView && profile?.maDonVi !== vanBan.maDonVi && vanBan.phamVi === 'NOIBO') {
        return <div>Bạn không có quyền xem văn bản này</div>
    }

    return (
        <div>
            <p className="text-2xl">Chi tiết văn bản</p>
            <div>
                <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">Thông Tin Văn Bản</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Mã:</p>
                            <p className="font-semibold">{vanBan.ma}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Tên văn bản</p>
                            <p className="font-semibold">{vanBan.tenTaiLieu}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Khoa:</p>
                            <p className="font-semibold">{vanBan.donVi.tenDonVi}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Lĩnh vực:</p>
                            <p className="font-semibold">{vanBan.linhVuc.tenLinhVuc}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Loại văn bản</p>
                            <p className="font-semibold">{vanBan.loaiVanBan.tenLoaiVanBan}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Cấp ban hành</p>
                            <p className="font-semibold">{vanBan.capBanHanh.tenCap}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Số Văn Bản:</p>
                            <p className="font-semibold">{vanBan.soVanBan}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Tên Tài Liệu:</p>
                            <p className="font-semibold">{vanBan.tenTaiLieu}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Mô Tả:</p>
                            <p className="font-semibold">{vanBan.trichYeu}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Đơn vị:</p>
                            <p className="font-semibold">{vanBan.donVi.tenDonVi}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Phạm Vi:</p>
                            <p className="font-semibold">{
                                vanBan.phamVi === 'NOIBO' ? 'Nội Bộ' : 'Công Khai'
                            }</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Ngày Ban Hành:</p>
                            <p className="font-semibold">{new Date(vanBan.ngayBanHanh).toLocaleDateString()}</p>
                        </div>
                    </div>
                    {vanBan.file && vanBan.file.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">Tệp Đính Kèm</h3>
                            {vanBan.file.map((file, index) => (
                                <div key={index} className="mt-2 flex items-center space-x-2 border border-gray-200 p-2 rounded-md">
                                    <p className="text-gray-600 w-[50px]">Tệp {index + 1}:</p>
                                    <a
                                        href={file.filePDF ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline w-1/2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span><IconPdf /></span>
                                            <p className="truncate w-1/2">{file.filePDF?.split("/").pop() || "No PDF file"}</p>
                                        </div>
                                    </a>

                                    <a
                                        href={file.fileGoc ?? undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline w-1/2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            {(() => {
                                                const fileExtension = file.fileGoc?.split(".").pop();
                                                if (fileExtension === "docx" || fileExtension === "doc") {
                                                    return <span className="text-green-500"><IconWord /></span>
                                                }
                                                if (fileExtension === "xls" || fileExtension === "xlsx") {
                                                    return <span className="text-green-500"><IconExcel /></span>
                                                }
                                            })()}
                                            <p className="truncate w-4/5">{file.fileGoc?.split("/").pop() || "File gốc trống"}</p>
                                        </div>
                                    </a>
                                    <br />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}
export default viewVanBan;