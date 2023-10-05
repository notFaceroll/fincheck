import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  isLoading: boolean;
}

export function ConfirmDeleteModal({
  title,
  description,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open onClose={onClose} title="Excluir">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="w-[180px] font-bold tracking-[-0.5px] text-gray-800">
          {title}
        </p>
        {description && (
          <p className="tracking-[-0.5px] text-gray-800">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          isLoading={isLoading}
          className="w-full"
          variant="danger"
          onClick={onConfirm}
        >
          Sim, desejo excluir
        </Button>
        <Button
          disabled={isLoading}
          className="w-full"
          variant="ghost"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
