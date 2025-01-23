import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface SelectWithLoadingProps<T> {
  PrefixIcon?: LucideIcon;
  fetchOptions: () => Promise<T[]>; // Function to fetch data
  onChange: (value: string) => void; // Handle selection changes
  labelExtractor?: (item: T) => string; // Extract display labels
  valueExtractor?: (item: T) => string; // Extract values
  placeholder?: string; // Optional placeholder
  defaultValue?: string;
}

export function SelectWithLoading<T>({
  PrefixIcon,
  fetchOptions,
  onChange,
  labelExtractor = (item) => item as unknown as string,
  valueExtractor = (item) => item as unknown as string,
  placeholder = "Select an option...",
  defaultValue,
}: SelectWithLoadingProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedData = await fetchOptions();
        setData(fetchedData);
      } catch (err) {
        setError("Có lỗi khi tải dữ liệu");
      } finally {
        setIsLoading(false);
      }
    };

    loadOptions();
  }, []);

  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      {PrefixIcon ? (
        <div className="relative">
          <PrefixIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4" />
          <SelectTrigger className="pl-10 data-[placeholder]:italic data-[placeholder]:text-muted-foreground">
            <SelectValue
              placeholder={isLoading ? "Đang tải..." : placeholder}
            />
          </SelectTrigger>
        </div>
      ) : (
        <SelectTrigger className="data-[placeholder]:italic data-[placeholder]:text-muted-foreground">
          <SelectValue placeholder={isLoading ? "Đang tải..." : placeholder} />
        </SelectTrigger>
      )}

      <SelectContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="animate-spin h-3 w-3 text-gray-500" />
          </div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-red-500">{error}</div>
        ) : data && data.length > 0 ? (
          data.map((item, index) => (
            <SelectItem key={index} value={valueExtractor(item)}>
              {labelExtractor(item)}
            </SelectItem>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            Không có dữ liệu nào
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
