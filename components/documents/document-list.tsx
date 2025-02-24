"use client";

import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Combobox } from "../combobox";
import { Separator } from "../ui/separator";

export const ViewDocumentModal = () => {
    const router = useRouter();
    const [documents, setDocuments] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [donVi, setDonVi] = useState<{ ma: number; tenDonVi: string; moTa: string }[]>([]);
    const [capBanHanh, setCapBanHanh] = useState<{ ma: number; tenCap: string }[]>([]);
    const [linhVuc, setLinhVuc] = useState<{ ma: number; tenLinhVuc: string }[]>([]);
    const [loaiVanBan, setLoaiVanBan] = useState<{ ma: number; tenLoaiVanBan: string }[]>([]);

     // Lưu trạng thái bộ lọc
     const [selectedDonVi, setSelectedDonVi] = useState<string | null>(null);
     const [selectedCapBanHanh, setSelectedCapBanHanh] = useState<string | null>(null);
     const [selectedLinhVuc, setSelectedLinhVuc] = useState<string | null>(null);
     const [selectedLoaiVanBan, setSelectedLoaiVanBan] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get("/api/documents", {
                    params: {
                        page: currentPage,
                        keyword: search,
                        donVi: selectedDonVi,
                        capBanHanh: selectedCapBanHanh,
                        linhVuc: selectedLinhVuc,
                        loaiVanBan: selectedLoaiVanBan,
                    },
                });
                setDocuments(response.data.documents);
                setDonVi(response.data.categories.donVi);
                setCapBanHanh(response.data.categories.capBanHanh);
                setLinhVuc(response.data.categories.linhVuc);
                setLoaiVanBan(response.data.categories.loaiVanBan);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error("Lỗi khi tải tài liệu:", error);
            }
        };

        const delaySearch = setTimeout(fetchDocuments, 300);
        return () => clearTimeout(delaySearch);
    }, [search, currentPage, selectedDonVi, selectedCapBanHanh, selectedLinhVuc, selectedLoaiVanBan]);

    const onClickView = (soVanBan: string) => {
        router.push(`/document/view/${soVanBan}`);
    };

    const onClickEdit = (soVanBan: string) => {
        router.push(`/document/edit/${soVanBan}`);
    };

    const donViOptions = [
        ...donVi.map((item) => ({
            value: item.ma.toString(),
            label: item.tenDonVi,
        })),
    ];

    const capBanHanhOptions = [
        ...capBanHanh.map((item) => ({
            value: item.ma.toString(),
            label: item.tenCap,
        })),
    ]

    const linhVucOptions = [
        ...linhVuc.map((item) => ({
            value: item.ma.toString(),
            label: item.tenLinhVuc,
        })),
    ]

    const loaiVanBanOptions = [
        ...loaiVanBan.map((item) => ({
            value: item.ma.toString(),
            label: item.tenLoaiVanBan,
        })),
    ]

    return (
        <div className="w-full rounded-lg shadow-sm mt-5">
            <div className="relative flex items-center w-1/5 py-4 bg-white dark:bg-gray-800">
                <Input
                    placeholder="Nhập tên hoặc mô tả văn bản"
                    className="w-full shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => {setSearch(e.target.value); setCurrentPage(1); }}
                />
                <button className="absolute right-0 p-2">
                    <Search className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                </button>
            </div>
            {/* tính năng lọc tìm kiếm */}
            <div className="flex gap-4 my-4">
                <Combobox options={donViOptions} label="Lọc theo khoa..." onChange={(value) => { setSelectedDonVi(value); setCurrentPage(1); }} />
                <Combobox options={capBanHanhOptions} label="Lọc theo cấp ban hành..." onChange={setSelectedCapBanHanh} />
                <Combobox options={linhVucOptions} label="Lọc theo lĩnh vực..." onChange={setSelectedLinhVuc} />
                <Combobox options={loaiVanBanOptions} label="Lọc theo loại văn bản..." onChange={setSelectedLoaiVanBan} />
            </div>
            <Table className="w-full text-center items-center">
                <TableCaption>Danh sách văn bản</TableCaption>
                <TableHeader className="bg-gray-100 dark:bg-gray-700">
                    <TableRow>
                        <TableHead>STT</TableHead>
                        <TableHead className="font-semibold">Tên tài liệu</TableHead>
                        <TableHead className="font-semibold">Mô tả</TableHead>
                        <TableHead className="font-semibold">Đơn vị</TableHead>
                        <TableHead className="font-semibold">Ngày ban hành</TableHead>
                        <TableHead className="font-semibold">Phạm vi</TableHead>
                        <TableHead className="font-semibold">File</TableHead>
                        <TableHead className="font-semibold">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="min-h-[500px]">
                    {documents.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8}>Không có dữ liệu</TableCell>
                        </TableRow>
                    ) : (
                        documents.map((document, index) => (
                            <TableRow key={index}>
                                <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                                <TableCell className="text-start">{document.tenTaiLieu}</TableCell>
                                <TableCell className="text-start">{document.trichYeu}</TableCell>
                                <TableCell className="text-start">{document.donVi?.tenDonVi || "N/A"}</TableCell>
                                <TableCell className="text-start">{new Date(document.ngayBanHanh).toLocaleDateString()}</TableCell>
                                <TableCell className="text-start">{document.phamVi}</TableCell>
                                <TableCell className="text-start">
                                    <ul>
                                        {document.file.map((file: any, index: number) => (
                                            <li key={index}>
                                                <a
                                                    href={file.filePDF}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                                >
                                                    {file.filePDF?.split("/").pop() || "No PDF file"}
                                                </a>
                                                <br />
                                                <a
                                                    href={file.fileGoc}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                                >
                                                    {file.fileGoc?.split("/").pop() || "No original file"}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell className="flex gap-4">
                                    <Button variant={"primary"} onClick={() => onClickEdit(document.soVanBan)}>Sửa</Button>
                                    <Button variant={"primary"} onClick={() => onClickView(document.soVanBan)}>Xem</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Phân trang */}
            <Separator />
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
