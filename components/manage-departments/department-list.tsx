"use client";
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
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircle, Search } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";

interface DonVi {
    ma: number;
    tenDonVi: string;
    moTa: string;
}

export const ListDepartment = () => {
    const { onOpen, isOpen } = useModal();

    const [listDonVi, setListDonVi] = useState<DonVi[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/department", {
                    params: {
                        page: currentPage,
                        keyword: search,
                        // sort: selectedSortDate,
                    },
                });
                setListDonVi(response.data.donVi);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };
        const delaySearch = setTimeout(fetchDocuments, 300);
        return () => clearTimeout(delaySearch);
    }, [search, currentPage, isOpen]);

    return (
        <div>
            <div className="flex flex-row gap-4 justify-between">
                <Button className="mt-5" variant={"primary"} onClick={() => onOpen("createDepartment")}>
                    <span>Thêm mới</span>
                </Button>
                <div className="relative flex items-center w-1/5 py-4 bg-white dark:bg-gray-800">
                    <Input
                        placeholder="Nhập tên khoa, đơn vị"
                        className="w-full shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                    <button className="absolute right-0 p-2">
                        <Search className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    </button>
                </div>
                {/* tính năng lọc tìm kiếm */}
                {/* <div className="flex gap-4 my-4">
                    <Combobox options={donViOptions} label="Đơn vị" onChange={setSelectedDonVi} />
                    <Combobox options={vaiTroOptions} label="Chức vụ" onChange={setSelectedVaiTro} />
                    <Combobox options={trangThaiOptions} label="Trạng thái" onChange={setSelectedTrangThai} />
                </div> */}
            </div>
            <Table>
                <TableCaption className="mb-10">Danh sách khoa, đơn vị</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-center">STT</TableHead>
                        {/* <TableHead>Mã Khoa</TableHead> */}
                        <TableHead>Tên khoa</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={8}>
                                <div className="space-y-2 w-full min-h-[600px] flex flex-col items-center justify-center">
                                    <p>Đang tải dữ liệu...</p>
                                    <LoaderCircle className="animate-spin" />
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : listDonVi.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">
                                <div className="space-y-2 w-full min-h-[600px] flex flex-col items-center justify-center">
                                    Không tìm thấy dữ liệu!
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        listDonVi.map((department: any, index: number) => (
                            <TableRow key={department.ma}>
                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                {/* <TableCell>{department.ma}</TableCell> */}
                                <TableCell>{department.tenDonVi}</TableCell>
                                <TableCell>{department.moTa}</TableCell>
                                <TableCell className="text-center">
                                    <div>
                                        <Button className="mr-2" variant={"outline"} onClick={() => onOpen("editDepartment", department)}>Sửa</Button>
                                        <Button variant={"outline"} onClick={() => onOpen("deleteDepartment", department)}>Xóa</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <div className="absolute bottom-0 right-0 w-full">
                <Separator />
                <Pagination >
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
        </div>
    )
}