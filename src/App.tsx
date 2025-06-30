import { OverlayProvider, overlay } from "overlay-kit";
import * as Dialog from "@radix-ui/react-dialog";

type DialogProps = {
	isOpen: boolean;
	close: () => void;
};

function InnerDialog({ isOpen, close }: DialogProps) {
	return (
		<Dialog.Root open={isOpen} onOpenChange={close}>
			<Dialog.Portal>
				<Dialog.Overlay
					style={{ background: "rgba(0,0,0,0.3)", position: "fixed", inset: 0 }}
				/>
				<Dialog.Content
					style={{
						background: "white",
						padding: 32,
						position: "fixed",
						top: 200,
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<div>Inner Dialog (Radix)</div>
					<Dialog.Close onClick={close}>Close Inner</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function OuterDialog({ isOpen, close }: DialogProps) {
	return (
		<Dialog.Root open={isOpen} onOpenChange={close}>
			<Dialog.Portal>
				<Dialog.Overlay
					style={{ background: "rgba(0,0,0,0.5)", position: "fixed", inset: 0 }}
				/>
				<Dialog.Content
					style={{
						background: "white",
						padding: 32,
						position: "fixed",
						top: 100,
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<div>Outer Dialog (Radix)</div>
					<button
						onClick={() =>
							overlay.open(({ isOpen, close }) => (
								<InnerDialog isOpen={isOpen} close={close} />
							))
						}
						type="button"
					>
						Open Inner Dialog (via overlay-kit)
					</button>
					<Dialog.Close onClick={close}>Close Outer</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default function App() {
	return (
		<OverlayProvider>
			<button
				onClick={() =>
					overlay.open(({ isOpen, close }) => (
						<OuterDialog isOpen={isOpen} close={close} />
					))
				}
				type="button"
			>
				Open Outer Dialog
			</button>
			{/* overlay-kit이 관리하는 오버레이들이 OverlayProvider 아래에 쌓임 */}
		</OverlayProvider>
	);
}
