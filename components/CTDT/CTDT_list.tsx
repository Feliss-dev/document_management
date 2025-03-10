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
import { useModal } from "@/hooks/use-modal-store";
import { set } from "date-fns";

export const ViewListCTDT = () => {
    const router = useRouter();
    const { onOpen, onClose, isOpen } = useModal();

    const [listCTDT, setListCTDT] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // Lưu trạng thái bộ lọc

    const [selectedSortDate, setSelectedSortDate] = useState<string | null>(null);
    const [selectedNamDanhGia, setSelectedNamDanhGia] = useState<string | null>(null);;

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get("/api/CTDT", {
                    params: {
                        page: currentPage,
                        keyword: search,
                        namDanhGia: selectedNamDanhGia,
                        sort: selectedSortDate,
                    },
                });
                setListCTDT(response.data.listCTDT);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error("Lỗi khi tải tài liệu:", error);
            }
        };

        const delaySearch = setTimeout(fetchDocuments, 300);
        return () => clearTimeout(delaySearch);
    }, [search, currentPage, selectedSortDate, selectedNamDanhGia,isOpen]);

    const onClickView = (soVanBan: string) => {
        router.push(`/document/view/${soVanBan}`);
    };

    const onClickEdit = (soVanBan: string) => {
        router.push(`/document/edit/${soVanBan}`);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => ({
        value: (currentYear - i).toString(),
        label: (currentYear - i).toString(),
    }));

    const sortDateOptions = [
        { value: "oldest", label: "Cũ nhất" },
        { value: "newest", label: "Mới nhất" },
    ];

    return (
        <div className="w-full rounded-lg shadow-sm">
            <div className="flex flex-row gap-4 justify-between">
                <div className="relative flex items-center w-1/5 py-4 bg-white dark:bg-gray-800">
                    <Input
                        placeholder="Nhập mã hoặc tên chương trình đào tạo"
                        className="w-full shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                    <button className="absolute right-0 p-2">
                        <Search className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    </button>
                </div>
                {/* tính năng lọc tìm kiếm */}
                <div className="flex gap-4 my-4">
                    <Combobox options={years} label="Năm" onChange={setSelectedNamDanhGia} />
                    {/* <Combobox options={sortDateOptions} label="Mới nhất." onChange={setSelectedSortDate} /> */}
                </div>
            </div>
            <Table className="w-full text-center items-center">
                <TableCaption>Danh sách văn bản</TableCaption>
                <TableHeader className="bg-gray-100 dark:bg-gray-700">
                    <TableRow>
                        <TableHead>STT</TableHead>
                        <TableHead className="font-semibold">Mã chương trình đào tạo</TableHead>
                        <TableHead className="font-semibold">Tên chương trình đào tạo</TableHead>
                        <TableHead className="font-semibold">Mô tả</TableHead>
                        <TableHead className="font-semibold">Năm đánh giá</TableHead>
                        <TableHead className="font-semibold">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listCTDT.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8}>Không có dữ liệu</TableCell>
                        </TableRow>
                    ) : (
                        listCTDT.map((CTDT, index) => (
                            <TableRow key={index}>
                                <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                                <TableCell className="text-start">{CTDT.maCTDT}</TableCell>
                                <TableCell className="text-start">{CTDT.tenCTDT}</TableCell>
                                <TableCell className="text-start">{CTDT.moTa || "N/A"}</TableCell>
                                <TableCell className="text-start">{CTDT.namDanhGia}</TableCell>

                                <TableCell className="flex gap-4">
                                    <Button variant={"primary"} onClick={() =>  onOpen("editCTDT", CTDT)}>Sửa</Button>
                                    <Button variant={"success"} onClick={() => { }}>Xem</Button>
                                    <Button variant={"destructive"} onClick={() => onOpen("deleteCTDT", CTDT)}>Xóa</Button>
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
